import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";

import db from "./config/db.js";
import passport from "./config/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/boilerplate.ejs");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


app.use(flash());


app.use(passport.initialize());
app.use(passport.session());






app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});