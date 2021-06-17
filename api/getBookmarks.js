const filler = require("./database/filler");

const getBookmarks = async (req, res, Bookmark) => {
  await Bookmark.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
};

module.exports = getBookmarks;
