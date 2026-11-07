import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import rateLimit from "express-rate-limit";
import passport from "../config/passport.js";

const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many login attempts. Please try again in 15 minutes.",
});

router.get('/login' ,( req , res)=>{
    res.render('login' , { type : login});
});

router.post('/login/verify', loginLimiter, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/authenticate/login",
    failureFlash: true,
  }));


router.get('/signup' , ( req , res)=>{
    res.render('signup' , { type : 'Sign Up' });
});
router.post('/signup/add' , signupLimiter, async( req , res , next)=>{
    const { name, email, password, role } = req.body;

    const id = uuidv4();

    const passwordHash = await bcrypt.hash(password, 12);

    await db.execute("INSERT INTO users (ID, NAME, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?, ?)", [id, name, email, passwordHash, role]);

   const user = { ID: id, NAME: name, EMAIL: email, ROLE: role };

   req.login( user , ( err)=>{
    if(err){
        return next( err );
    }
    res.redirect('/');
   });
});


export default router;