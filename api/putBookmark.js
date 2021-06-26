const putBookmark = async (req, res, Bookmark, id) => {
  if (req.body.title && req.body.description) {
    await Bookmark.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
    });
  } else if (req.body.description) {
    await Bookmark.findByIdAndUpdate(id, {
      description: req.body.description,
    });
  } else if (req.body.like) {
    await Bookmark.findByIdAndUpdate(id, {
      like: req.body.like,
    });
  }

  res.send();
};

module.exports = putBookmark;
