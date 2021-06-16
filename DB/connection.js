const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const URI =
  "mongodb+srv://dbUser:dbUser@cluster0.66qke.mongodb.net/Flavorite?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("AWS database connection successful");
};

module.exports = connectDB;
