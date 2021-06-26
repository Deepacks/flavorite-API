const mongoose = require("mongoose");

const bookmarkModel = () => {
  const bookmarkSchema = {
    id: String,
    title: String,
    image: String,
    url: String,
    description: String,
    like: Boolean,
    preview: String,
  };

  return mongoose.model("Bookmark", bookmarkSchema);
};

module.exports = bookmarkModel;
