const filler = async (_id, id, image, url, Bookmark) => {
  if (_id !== id) {
    await Bookmark.findByIdAndUpdate(_id, {
      id: _id,
    });
  }
  if (image.length === 0) {
    await Bookmark.findByIdAndUpdate(_id, {
      image: "https://www.google.com/s2/favicons?sz=64&domain_url=" + url,
    });
  }
};

module.exports = filler;
