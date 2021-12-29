// express set up
const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
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

const Product = require("./models/product");

// app.get("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   const comment = comments.find(c => c.id === parseInt(id));
//   res.render("comments/id", { comment });
// });

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

// express server is on port 3000 - >  localhost:3000
app.listen(3000, () => {
  console.log(">> listening on port 3000");
});
