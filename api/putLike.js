const putLike = async (req, res, Bookmark, id) => {
  await Bookmark.findByIdAndUpdate(id, {
    like: req.body.like,
  });
  res.send();
};

module.exports = putLike;
