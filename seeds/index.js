const Place = require("../models/place");
const cities = require("./cities");
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
  for (let city in cities) {
    const place = new Place({ title: city.city });

    await place.save();
  }
}

clearDB();
seedDB().then(() => {
  mongoose.connection.close();
});
