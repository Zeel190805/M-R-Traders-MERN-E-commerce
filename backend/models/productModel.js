import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String  },
    rating: { type: Number  },
    comment: { type: String  },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String  },
    image: { type: String  },
    brand: { type: String  },
    quantity: { type: Number  },
    category: { type: ObjectId, ref: "Category"  },
    description: { type: String  },
    reviews: [reviewSchema],
    rating: { type: Number , default: 0 },
    numReviews: { type: Number , default: 0 },
    price: { type: Number , default: 0 },
    countInStock: { type: Number , default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
