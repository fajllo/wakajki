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

app.get("/places", async (req, res) => {
  const places = await Place.find({});
  res.render("places/index", { places });
});

app.get("/places/new", async (req, res) => {
  res.render("places/new");
});

app.post("/places/", async (req, res) => {
  const { title } = req.body;
  const place = new Place({ title });
  await place.save();
  res.redirect(`places/${place.id}`);
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render("places/show", { place });
});

app.get("/places/:id/edit", async (req, res) => {
  const trimmed = req.params.id.trim();
  const place = await Place.findById(trimmed);
  res.render("places/edit", { place });
});

app.put("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(
    id,
    { title: req.body.place.title },
    { runValidators: true }
  );
  res.redirect(`/places/${place._id}`);
});

app.delete("/places/:id", async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect("/places");
});

// express server is on port 3000 - >  localhost:3000
app.listen(3000, () => {
  console.log(">> listening on port 3000");
});
