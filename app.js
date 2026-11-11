import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import sessionMiddleware from "./config/session.js";
import flash from "connect-flash";
import helmet from "helmet";

import db from "./config/db.js";
import redis from "./config/redis.js";
import passport from "./config/passport.js";
import users from "./routes/authentication.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/boilerplate.ejs");

app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use('/authenticate', users);

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
