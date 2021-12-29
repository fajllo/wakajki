const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Place = require("../models/place");
async function main() {
  await mongoose.connect(
    "mongodb+srv://fsdr:dupadupa@cluster0.gafjh.mongodb.net/Cluster0?retryWrites=true&w=majority"
  );
}

main()
  .then(() => {
    console.log("connected");
  })
  .catch(err => console.log(err));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Place.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const place = new Place({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await place.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
