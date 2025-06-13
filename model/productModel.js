const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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

const productModel = model("product", productSchema);

module.exports = productModel;
