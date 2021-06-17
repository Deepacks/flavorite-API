const express = require("express");
const morgan = require("morgan");
const allowCORS = require("./cors/allowCORS");
const connectDB = require("./DB/connection");
const bookmarkModel = require("./DB/bookmarkModel");
const getBookmarks = require("./api/getBookmarks");
const postBookmark = require("./api/postBookmark");
const putBookmark = require("./api/putBookmark");
const putDescription = require("./api/putDescription");
const deleteBookmark = require("./api/deleteBookmark");
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
const Switch = switchModel();

app.get("/bookmarks", (req, res) => {
  getBookmarks(req, res, Bookmark);
});

app.post("/bookmarks", (req, res) => {
  postBookmark(req, res, Bookmark);
});

app.put("/bookmarks/update/:id", (req, res) => {
  putBookmark(req, res, Bookmark, req.params.id);
});

app.put("/bookmarks/description/:id", (req, res) => {
  putDescription(req, res, Bookmark, req.params.id);
});

app.delete("/bookmarks/delete/:id", (req, res) => {
  deleteBookmark(req, res, Bookmark, req.params.id);
});

//api switch
app.put("/api/switch", (req, res) => {
  putSwitch(req, res, Switch);
});

app.get("/api/switch", (req, res) => {
  getSwitch(req, res, Switch);
});

app.listen(process.env.PORT || Port, () => {
  console.log("Server running on port " + process.env.PORT);
});
