import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import db from "./db.js";

passport.serializeUser((user, done) => {
    done(null, user.ID);
});

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

                if (!user.PASSWORD) {
                    return done(null, false, { message: "Please login using Google/GitHub" });
                }

                const isMatch = await bcrypt.compare(password, user.PASSWORD);
                if (!isMatch) {
                    return done(null, false, { message: "Wrong email or password" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const [usersByGoogleId] = await db.query(
                    "SELECT ID, NAME, EMAIL, ROLE FROM USERS WHERE GOOGLE_ID = ?",
                    [profile.id]
                );
                if (usersByGoogleId.length > 0) {
                    return done(null, usersByGoogleId[0]);
                }

                const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                if (email) {
                    const [usersByEmail] = await db.query(
                        "SELECT ID, NAME, EMAIL, ROLE FROM USERS WHERE EMAIL = ?",
                        [email]
                    );
                    if (usersByEmail.length > 0) {
                        await db.execute(
                            "UPDATE USERS SET GOOGLE_ID = ? WHERE EMAIL = ?",
                            [profile.id, email]
                        );
                        return done(null, usersByEmail[0]);
                    }
                }

                const id = uuidv4();
                const name = profile.displayName || "Google User";
                const role = "guest";

                await db.execute(
                    "INSERT INTO USERS (ID, NAME, EMAIL, GOOGLE_ID, ROLE) VALUES (?, ?, ?, ?, ?)",
                    [id, name, email, profile.id, role]
                );

                const newUser = { ID: id, NAME: name, EMAIL: email, ROLE: role };
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

export default passport;
