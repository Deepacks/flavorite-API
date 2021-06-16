const putSwitch = async (req, res, Switch) => {
  const id = "60ca265f4db3081c2510fe49";
  await Switch.findByIdAndUpdate(id, {
    python: req.body.python,
  });
};

module.exports = putSwitch;
