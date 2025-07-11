const Product = require("../model/productModel");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

exports.LoginProduct = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Product.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "username and password not match" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.CreateProduct = async (req, res) => {
  const product = req.body;

  try {
    const existingname = await Product.findOne({ name: product.name });
    if (existingname) {
      return res.status(409).json({
        message: "product name alredy exists",
      });
    }
    const newProduct = new Product(product);
    await newProduct.save();
    const Token = generateToken({
      id: newProduct.id,
      name: newProduct.name,
      category: newProduct.category,
      username: newProduct.username,
    });
    res
      .status(201)
      .json({ message: "Product create", newProduct, token: Token });
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

exports.GetProduct = async (req, res) => {
  try {
    const filter = {};

    if (req.query.id) {
      filter.id = req.query.id;
    }
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 30;

    const totalResults = await Product.countDocuments(filter);
    const lastPage = Math.ceil(totalResults / perPage);

    const allProduct = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (!allProduct || allProduct.length === 0) {
      return res.json({
        success: false,
        message: "no  Products get",
        error: err.message,
      });
    }
    res.status(200).json({
      message: "get Products",
      data: allProduct,
      pagination: {
        per_page: perPage,
        current_page: page,
        last_page: lastPage,
        total_results: totalResults,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: "not Get Products",
    });
  }
};

exports.UpdateById = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error retrieving product",
      error: err.message,
    });
  }
};

exports.DeleteById = async (req, res) => {
  try {
    const product = await Product.deleteOne({ id: req.params.id });

    if (!product || length.product) {
      return res.json({
        success: false,
        message: "not found given product",
        error: err.message,
      });
    }

    res.status(204).json({});
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error retrieving product",
      error: err.message,
    });
  }
};

// module.exports = {
//   GetProduct,
//   CreateProduct,
//   UpdateById,
//   DeleteById,
// };
