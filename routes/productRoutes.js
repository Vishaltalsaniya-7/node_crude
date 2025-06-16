const express = require("express");
const passport = require("passport");
const auth = require("../auth");
const router = express.Router();
const productControllers = require("../controller/productController");
const localAuthenticaate = passport.authenticate("local", { session: false });
const jwttoken = require("../jwt").jwtAuthMiddleware;

router.get("/products", jwttoken, productControllers.GetProduct);
router.post("/signup/products", productControllers.CreateProduct);
router.post("/login/products", productControllers.LoginProduct);
router.put("/products/:id", productControllers.UpdateById);
router.delete("/products/:id", productControllers.DeleteById);

module.exports = router;
