const express = require("express");

const router = express.Router();
const productControllers = require("../controller/productController");

router.get("/products", productControllers.GetProduct);
router.post("/products", productControllers.CreateProduct);
router.put("/products/:id", productControllers.UpdateById);
router.delete("/products/:id", productControllers.DeleteById);

module.exports = router;
