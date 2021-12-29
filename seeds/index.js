const Place = require("../models/place");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
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

async function clearDB() {
  await Place.deleteMany({});
}

async function seedDB() {
  for (let city of cities) {
    // const random1000 = Math.floor(Math.random() * ślength(descriptors));
    // console.log(city);
    const place = new Place({ title: city.city });

    await place.save();
  }
}

clearDB();
seedDB().then(() => {
  console.log("connection closed");
  mongoose.connection.close();
});
