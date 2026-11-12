import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import rateLimit from "express-rate-limit";
import passport from "../config/passport.js";
import {sendOtpEmail} from "../utils/mailer.js";
import crypto from "crypto";
import redis from "../config/redis.js";
import signupSchema from "../utils/validator.js";


const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

async function  loginLimiter ( req , res , next ){
    const redisKey = `login:attempt${req.body.email}`; // create a unique key for each email address

    const limit = await redis.incr( redisKey );// increment the count of login attempts for this email address in Redis


    if ( limit == 1 ){// if this is the first login attempt for this email address, set an expiration time of 15 minutes for the Redis key
        await redis.expire( redisKey , 900 );
    };

    if ( limit > 5){// if the user has exceeded the limit of 5 login attempts within 15 minutes, block further attempts and return an error message
        req.flash("error" ,"Too Many login attempts.Please Try Again after 15 minutes");
        return res.redirect('/authenticate/login');
    };

    return next();
};



router.get('/login', (req, res) => {
    res.render('login', { title: 'login' });
});

router.post('/login/verify', loginLimiter, passport.authenticate("local", {
    failureRedirect: "/authenticate/login",
    failureFlash: true,
}), (req, res) => {
    req.flash("success", `Welcome back, ${req.user.NAME}!`);
    res.redirect("/");
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

router.post('/signup/add', signupLimiter, async (req, res, next) => {
    try {
        // validating input data by zod and regex
        const result = signupSchema.safeParse( req.body);
        if( result.success ){ // if its valid then fetch data from result.data instead of re.body coz its more secure and purified clean data 
        const name = result.data.name;
        const email = result.data.email;
        const password = result.data.password;

        const [existingUsers] = await db.query(
            "SELECT ID FROM USERS WHERE EMAIL = ?",
            [email]
        );
        if (existingUsers.length > 0) {
            req.flash("error", "This email is already registered. Please login!");
            return res.redirect('/authenticate/signup');
        }

        const id = uuidv4();
        const role = 'guest';
        const passwordHash = await bcrypt.hash(password, 12);
        const otp = crypto.randomInt(100000, 1000000).toString();
        const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
        const redisKey = `otp:${email}`;
        const pendingKey = `signup:pending:${email}`;
        const pendingSignup = JSON.stringify({ id, name, email, passwordHash, role });// redis stores in string/text format

        await redis.set(redisKey, hashedOTP, "EX", 400);
        await redis.set(pendingKey, pendingSignup, "EX", 600);

        try {
            await sendOtpEmail(email, otp);
        } catch (err) {
            next(err);
        };

        return res.render('enter-otp', { title: 'Verify OTP', email });
        }else if ( !result.success){
            req.flash("error" , result.error.issues[0].message);
            return res.redirect('/authenticate/signup');
        };

    } catch (err) {
        req.flash("error" , "Some error occured please try again");
        next(err);
    };
});

router.post('/signup/verify-otp', async (req, res, next) => {
    try {
        const SignupEmail = req.body.email.toLowerCase().trim();
        const otp = req.body.otp;
        const pendingSignup = await redis.get(`signup:pending:${SignupEmail}`);
        if (!pendingSignup) { // key expired
            req.flash("error", "Your session has expired. Please sign up again.");
            return res.redirect('/authenticate/signup');
        };
        const enteredHashOTP = crypto.createHash("sha256").update(otp).digest("hex");
        const storedOTp = await redis.get(`otp:${SignupEmail}`);

        if( enteredHashOTP !== storedOTp ){// wrong otp entered
            req.flash("error" , "Incorrect OTP. Please re-enter correct OTP");
            return res.render('enter-otp' , { title: 'Verify OTP', email: SignupEmail });
        };

        const StoredSignUp = JSON.parse(pendingSignup);
        const { id, name,  email, passwordHash, role } = StoredSignUp;

        try {
            await db.execute( 'INSERT INTO USERS (ID , NAME , EMAIL , PASSWORD , ROLE , IS_VERIFIED) VALUES ( ? , ? , ? , ? , ? , ?)' ,
             [ id , name , email , passwordHash , role , true ] );
             req.login( { ID: id , NAME: name , EMAIL: email , ROLE: role } , (err) => { //serialize the user and create a session for the user 
                if (err) {
                    return next(err);
                };
                req.flash("success", `Welcome to Stayora, ${name}!`);
                return res.redirect('/');
            });
        }catch( err ){
            req.flash("error" , "Some error occured please try again");
            return next(err);
        };

    
    } catch (err) {
        return next(err);
    }
});

router.post('/signup/resend-otp' , async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase().trim();
        const pendingSignup = await redis.get(`signup:pending:${email}`);

        const limit = `otpResend:${email}`;

        // if user signup time has expired then redirect to signup page with error message
        if (!pendingSignup) { // key expired
            req.flash("error", "Your session has expired. Please sign up again.");
            return res.redirect('/authenticate/signup');
        };

// Check the number of OTP resend attempts for this email in Redis
        const track = await redis.incr(limit);
        if (track === 1) {
            await redis.expire(limit, 900);
        } else if (track > 3) { // If the user has exceeded the limit of 3 attempts within 15 minutes then block further attempts and return an error message
            req.flash("error", "You have exceeded the maximum number of OTP resend attempts. Please try again after 15 minutes.");
            return res.redirect('/authenticate/signup');
        };



        // Generate a new OTP, hash it, and store it in Redis with a 5-minute expiration time
        const otp = crypto.randomInt(100000, 1000000).toString();
        const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
        await redis.set(`otp:${email}`, hashedOTP, "EX", 400);

        try {
            await sendOtpEmail(email, otp);
            req.flash("success", "A new OTP has been sent to your email.");
            return res.render('enter-otp', { title: 'Verify OTP', email });
        } catch (err) {
            next(err);
        };
    } catch (err) {
        return next(err);
    }
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/authenticate/login',
    failureFlash: true,
}), (req, res) => {
    req.flash('success', `Welcome to Stayora, ${req.user.NAME}!`);
    res.redirect('/');
});

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password', { title: 'Forgot Password' });
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out successfully!");
        res.redirect('/');
    });
});

export default router;
