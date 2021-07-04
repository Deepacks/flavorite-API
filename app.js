const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const routes = require("./routes");
require("dotenv").config();

// -------------- DB CONNECTION --------------

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("AWS database connection succesful"));
mongoose.set("useFindAndModify", false);

// -------------- GENERAL SETUP --------------

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://flavorite.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// -------------- PASSPORT CONFIG --------------

require("./config/passport")(passport);

// -------------- SESSION SETUP --------------

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(cookieParser(process.env.SECRET));

// -------------- PASSPORT AUTH --------------

app.use(passport.initialize());
app.use(passport.session());

// -------------- ROUTES --------------

app.use(routes);

// -------------- SERVER --------------

const port = 5000;

app.listen(process.env.PORT || port, () => {
  console.log("Server running on port " + port); // to change to heroku env port
});
