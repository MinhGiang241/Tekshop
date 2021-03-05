import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    image: [
      {
        type: String,
        require: true,
      },
    ],
    brand: {
      type: String,
      require: true,
    },
    screen: {
      type: String,
      require: true,
      default: "Chưa cập nhật",
    },
    CPU: {
      type: String,
      require: true,
      default: "Chưa cập nhật",
    },
    mainCamera: {
      type: String,
      require: true,
      default: "Chưa cập nhật",
    },

    selfieCamera: {
      type: String,
      require: true,
      default: "Chưa cập nhật",
    },
    hdd: {
      type: String,
      require: true,
      default: "Chưa cập nhật",
    },
    RAM: {
      type: String,
      require: true,
      default: "Chưa cập nhật",
    },

    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    timeRelease: {
      type: String,
      require: true,
    },
    battery: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: String,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
