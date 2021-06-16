const deleteBookmark = async (req, res, Bookmark, id) => {
  await Bookmark.findByIdAndRemove(id);
  res.send();
};

module.exports = deleteBookmark;
