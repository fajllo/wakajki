// express set up
const express = require("express");
const app = express();
const path = require("path");
const Place = require("./models/place");

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// mongoose and mongo set up data
const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("connected");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://fsdr:dupadupa@cluster0.gafjh.mongodb.net/Cluster0?retryWrites=true&w=majority"
  );
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/place", async (req, res) => {
  const place = new Place({ title: "test title" });
  await place.save();
  console.log(place);
  res.send("new cam preaetd");
});

// express server is on port 3000 - >  localhost:3000
app.listen(3000, () => {
  console.log(">> listening on port 3000");
});
