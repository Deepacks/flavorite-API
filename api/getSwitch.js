const getSwitch = async (req, res, Switch) => {
  await Switch.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
};

module.exports = getSwitch;
