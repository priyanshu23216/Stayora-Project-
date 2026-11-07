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
        const { name, email, password, role } = req.body;
        const id = uuidv4();
        const passwordHash = await bcrypt.hash(password, 12);

        await db.execute(
            "INSERT INTO users (ID, NAME, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?, ?)",
            [id, name, email, passwordHash, role]
        );

        const user = { ID: id, NAME: name, EMAIL: email, ROLE: role };

        req.login(user, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to Stayora, ${name}!`);
            res.redirect('/');
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            req.flash("error", "This email is already registered. Please login!");
            return res.redirect('/authenticate/signup');
        }
        next(err);
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
