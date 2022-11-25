const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bj7tl8f.mongodb.net/?retryWrites=true&w=majority`
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Connected");
});

exports.test = function (req, res) {
  res.render("test");
};
