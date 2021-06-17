const filler = require("./database/filler");

const postBookmark = async (req, res, Bookmark) => {
  const bookmark = new Bookmark({
    id: "666",
    title: req.body.title,
    image:
      "https://www.google.com/s2/favicons?sz=64&domain_url=" + req.body.url,
    url: req.body.url,
    description: req.body.description,
  });

  await bookmark.save();
  //id adapter for UI dual API compatibility
  await filler(Bookmark, res);
};

module.exports = postBookmark;
