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

const Reviews = mongoose.model("review", reviewSchema);

productSchema.methods.addReview = function (name: string, comment: string) {
  const newReview = new Reviews();
  newReview.name = name;
  newReview.comment = comment;
  newReview.rating = 5;
  console.log("newReview", newReview);
  const newReviews = [...(this as any).reviews, newReview];
  (this as any).reviews = newReviews;
  (this as any).numReviews = (this as any).numReviews + 1;
  return (this as any).save();
};

const Product = mongoose.model("Product", productSchema);

export default Product;
