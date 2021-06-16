const putDescription = async (req, res, Bookmark, id) => {
  await Bookmark.findByIdAndUpdate(id, {
    description: req.body.description,
  });
  res.send();
};

module.exports = putDescription;
