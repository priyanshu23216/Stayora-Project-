import "dotenv/config";
import session from "express-session";
import RedisStore from "connect-redis";
import redis from "./redis.js";

const sessionMiddleware = session({
    store: new RedisStore({client: redis}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure : process.env.NODE_ENV === "production",// set secure to true in production
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days validity for the session cookie
    }
});

export default sessionMiddleware;