const mongoose = require("mongoose");

const switchModel = () => {
  const switchSchema = {
    python: Boolean,
  };

  return mongoose.model("Switch", switchSchema);
};

module.exports = switchModel;
