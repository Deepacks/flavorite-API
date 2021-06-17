const filler = async (Bookmark, res) => {
  await Bookmark.find({ id: "666" }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      doc[0].id = doc[0]._id;
      doc[0].save(() => {
        res.send();
      });
    }
  });
};

module.exports = filler;
