const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const ProductRoutes = require("./routes/productRoutes");
const nodemon = require("nodemon");

const app = express();

dotenv.config();

const port = process.env.PORT;
connectDB();

app.use(bodyParser.json());

app.use("/api", ProductRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
