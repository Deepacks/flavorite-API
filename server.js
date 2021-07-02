require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// cors
const allowCORS = require("./cors/allowCORS");
// db
const connectDB = require("./DB/connection");
const bookmarkModel = require("./DB/bookmarkModel");
const userModel = require("./DB/userModel");
// authentication
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
// api
const getBookmarks = require("./api/getBookmarks");
const postBookmark = require("./api/postBookmark");
const putBookmark = require("./api/putBookmark");
const deleteBookmark = require("./api/deleteBookmark");
// switch
const switchModel = require("./DB/switchModel");
const putSwitch = require("./api/putSwitch");
const getSwitch = require("./api/getSwitch");

const app = express();

allowCORS(app);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//mongoose.set("useFindAndModify", false);
const URI =
  "mongodb+srv://dbUser:dbUser@cluster0.66qke.mongodb.net/Flavorite?retryWrites=true&w=majority";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("AWS database connection successful"));
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (user, done) {
  User.findById(_id, function (err, user) {
    done(err, user);
  });
});

// connectDB();
const Port = 5000;

const Bookmark = bookmarkModel();
//const User = userModel();
const Switch = switchModel();

// AUTH
app.post("/register", (req, res) => {
  
});

app.post("/login", (req, res) => {
  
});

// APP
app
  .route("/bookmarks")
  .get((req, res) => {
    getBookmarks(req, res, Bookmark);
  })
  .post((req, res) => {
    postBookmark(req, res, Bookmark);
  });

app
  .route("/bookmarks/:id")
  .put((req, res) => {
    putBookmark(req, res, Bookmark, req.params.id);
  })
  .delete((req, res) => {
    deleteBookmark(req, res, Bookmark, req.params.id);
  });

// SWITCH
app
  .route("/api/switch")
  .put((req, res) => {
    putSwitch(req, res, Switch);
  })
  .get((req, res) => {
    getSwitch(req, res, Switch);
  });

app.listen(process.env.PORT || Port, () => {
  console.log("Server running on port " + process.env.PORT);
});
