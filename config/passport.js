import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./db.js";

// 1. Session mein sirf user ki ID save karo
passport.serializeUser((user, done) => {
    done(null, user.ID);
});

// 2. Har request par ID se MySQL se user nikaal ke req.user mein daalo
passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await db.query(
            "SELECT ID, NAME, EMAIL, ROLE FROM USERS WHERE ID = ?",
            [id]
        );
        done(null, rows[0] || false);
    } catch (err) {
        done(err);
    }
});

// 3. Email + Password Login Strategy
passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const [rows] = await db.query(
                    "SELECT * FROM USERS WHERE EMAIL = ?",
                    [email]
                );
                const user = rows[0];

                if (!user) {
                    return done(null, false, { message: "Invalid email or password" });
                }

                // Agar OAuth (Google/GitHub) user hai jiska password NULL hai
                if (!user.PASSWORD) {
                    return done(null, false, { message: "Please login using Google/GitHub" });
                }

                const isMatch = await bcrypt.compare(password, user.PASSWORD);
                if (!isMatch) {
                    return done(null, false, { message: "Invalid email or password" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

export default passport;