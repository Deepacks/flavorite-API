const filler = require("./database/filler");

const getBookmarks = async (req, res, Bookmark) => {
  await Bookmark.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      //New bookmarks get their id & image set for UI necessities
      docs.forEach((doc) => {
        filler(doc._id, doc.id, doc.image, doc.url, Bookmark);
      });

      res.send(docs);
    }
  });
};

module.exports = getBookmarks;
