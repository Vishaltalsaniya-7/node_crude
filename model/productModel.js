const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const productSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    username: {
      require: true,
      type: String,
    },
    password: {
      require: true,
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.deletedAt;
        return ret;
      },
    },
  }
);

productSchema.pre("save", async function (next) {
  const product = this;

  if (!product.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);

    const hashepassword = await bcrypt.hash(product.password, salt);

    product.password = hashepassword;
    next();
  } catch (err) {
    return done(err);
  }
});

productSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const productModel = model("product", productSchema);

module.exports = productModel;
