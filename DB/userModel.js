const mongoose = require("mongoose");

const userModel = () => {
  const userSchema = {
    email: String,
    password: String,
  };

  return mongoose.model("User", userSchema);
};

module.exports = userModel;
