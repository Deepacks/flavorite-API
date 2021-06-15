const express = require("express");
const mongoose = require("mongoose");
const logging = require(__dirname + "/logging.js");

const app = express();

const testContent = [
  {
    description: "",
    id: "60bb87c15f3ef30cb7ee7764",
    image:
      "https://www.celluccigomme.it/wp-content/uploads/2018/07/noPhoto.png",
    title: "Twitter\n",
    url: "https://twitter.com/home?lang=it",
  },
  {
    description: "",
    id: "60bb87d33c99767d56ee776e",
    image:
      "https://www.celluccigomme.it/wp-content/uploads/2018/07/noPhoto.png",
    title: "Binance",
    url: "https://www.binance.com/en",
  },
];

app.get("/bookmarks", (req, res) => {
  res.send(testContent);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
