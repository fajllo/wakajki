const Product = require("./models/product");

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

const p = new Product({
  name: "apple",
  price: 1.99,
});
const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then(res => {
    console.log("saved");
  })
  .catch(e => {
    console.log(e);
  });
