const putBookmark = async (req, res, Bookmark, id) => {
  await Bookmark.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
  });
  res.send();
};

module.exports = putBookmark;
