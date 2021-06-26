const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
//cors
const allowCORS = require("./cors/allowCORS");
//db
const connectDB = require("./DB/connection");
const bookmarkModel = require("./DB/bookmarkModel");
const userModel = require("./DB/userModel");
//api
const getBookmarks = require("./api/getBookmarks");
const postBookmark = require("./api/postBookmark");
const putBookmark = require("./api/putBookmark");
const deleteBookmark = require("./api/deleteBookmark");
//authentication
const register = require("./authentication/register");
const login = require("./authentication/login");
//switch
const switchModel = require("./DB/switchModel");
const putSwitch = require("./api/putSwitch");
const getSwitch = require("./api/getSwitch");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

allowCORS(app);
connectDB();
const Port = 5000;

const Bookmark = bookmarkModel();
const User = userModel();
const Switch = switchModel();

//AUTH
app.post("/register", (req, res) => {
  register(req, res, User, bcrypt);
});

app.post("/login", (req, res) => {
  login(req, res, User, bcrypt);
});

//APP
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

//SWITCH
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
