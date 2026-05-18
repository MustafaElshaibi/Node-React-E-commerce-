const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
      unique: true // Ensure title uniqueness
    },
    image: { type: String, required: true },
    gallery: {type: [String] },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be at least 0"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Fixed type declaration
      ref: "Category",
      required: true,
    },
    reviews: [reviewSchema],
    popular: { type: Boolean, default: false },
    discount: { 
      type: Number, 
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"]
    },
    colors: [{ type: String }],
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    numReviews: { 
      type: Number, 
      default: 0,
      min: [0, "Review count cannot be negative"]
    },
    stock: {
      type: Number,
     required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    edition: { type: String },
    onSale: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    // Better error handling for unique constraints
    statics: {
      async createWithValidation(productData) {
        try {
          const product = new this(productData);
          return await product.save();
        } catch (error) {
          if (error.code === 11000) {
            const key = Object.keys(error.keyPattern)[0];
            throw new Error(`Duplicate ${key}: ${productData[key]} already exists`);
          }
          throw error;
        }
      }
    }
  }
);


productSchema.index(
  { 
    title: 'text',
    description: 'text',
    brand: 'text',
    model: 'text',
    color: 'text'
  },
  {
    name: 'search_index',
    weights: {
      title: 10,
      description: 5,
      brand: 5,
      model: 5,
      color: 5
    },
    default_language: 'english'
  }
);

module.exports = mongoose.model("Product", productSchema);