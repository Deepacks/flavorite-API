const putBookmark = async (req, res, Bookmark, id) => {
  if (req.body.title) {
    await Bookmark.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
    });
    console.log("card");
  } else if (req.body.description) {
    await Bookmark.findByIdAndUpdate(id, {
      description: req.body.description,
    });
    console.log("description");
  } else if (req.body.like || req.body.like === false) {
    await Bookmark.findByIdAndUpdate(id, {
      like: req.body.like,
    });
  }

  res.send();
};

module.exports = putBookmark;
