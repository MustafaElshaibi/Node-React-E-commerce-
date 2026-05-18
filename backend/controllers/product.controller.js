const { validationResult } = require("express-validator");
const Products = require("../models/product.model");
const httpStatusText = require("../utility/httpStatusText");
const errorWrapper = require("../middlewares/errorWrapper.middleware");
const errorHelper = require("../utility/errorHelper");
const fs = require("fs");
const path = require("path");
const ApiFeatures = require("../utility/ApiFeatures");
const Category = require("../models/category.model");
const { deleteUploadedFiles } = require("../utility/uploadFiles");

const getAllProducts = errorWrapper(async (req, res, next) => {
  const features = new ApiFeatures(
    Products.find().populate("category"),
    req.query
  )
    .filter()
    .textSearch()
    .sort()
    .limitFields()
    .paginate();

  const { results, pagination } = await (await features).execute();

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      count: results.length,
      pagination,
      products: results,
    },
  });
});

const getSingleProduct = errorWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Products.findById(productId)
    .populate("category")
    .populate({
      path: "reviews.user",
      select: "firstName lastName profile.avatar"
    })
    .exec();
  if (!product) {
    const error = errorHelper.create(
      "Product not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }
  product.reviews.sort((a, b) => b.createdAt - a.createdAt)
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { product } });
});

const addProduct = errorWrapper(async (req, res, next) => {
  
  if (!req.files.image) {
    if(req.files.gallery) deleteUploadedFiles(req.files.gallery);
    return next(
      errorHelper.create("Product image is required", 400, httpStatusText.FAIL)
    );
  }

  try {
    const { category } = req.body;
    // Verify category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      deleteUploadedFiles(req.files.image[0]);
      return next(
        errorHelper.create("Category not found", 404, httpStatusText.FAIL)
      );
    }

    if(req.files.gallery) {
      // Prepare gallery images
    const galleryImages =
      req.files.gallery?.map(
        (file) => `${process.env.BACKEND_URL}/uploads/products/${file.filename}`
      ) || [];
      req.body.gallery = galleryImages;
    }

    // Create new product with validation
    const newProduct = await Products.createWithValidation({
      ...req.body,
      image: `${process.env.BACKEND_URL}/uploads/products/${req.files.image[0].filename}`,
    });

    // Populate category in response
    const populatedProduct = await newProduct.populate("category");

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { product: populatedProduct },
    });
  } catch (err) {
    // Clean up file on any error
    if (req.files.image) deleteUploadedFiles(req.files.image[0]);
    if (req.files.gallery) deleteUploadedFiles(req.files.gallery);

    // Handle duplicate key error
    if (err.message.startsWith("Duplicate")) {
      return next(errorHelper.create(err.message, 409, httpStatusText.FAIL));
    }

    // Handle other errors
    next(errorHelper.create(err.message, 500, httpStatusText.ERROR));
  }
});

const updateProduct = errorWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const oldProduct = await Products.findById(productId);

  if (!oldProduct) {
    if (req.files.image) {
      deleteUploadedFiles(req.files.image[0]);
    }
    if(req.files.gallery) deleteUploadedFiles(req.files.gallery);
    const error = errorHelper.create(
      "Product not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const updateData = { ...req.body };
  let oldImagePath = null;
  let oldImagePathArr = null;

  // Handle new image upload
  if (req.files.image) {
    updateData.image = `${process.env.BACKEND_URL}/uploads/products/${req.files.image[0].filename}`;
    oldImagePath = oldProduct.image;
  }

  if (req.files.gallery) {
    const uploadedFiles = req.files.gallery.map(
      (file) => `${process.env.BACKEND_URL}/uploads/products/${file.filename}`
    );
    updateData.gallery = uploadedFiles;
    oldImagePathArr = oldProduct.gallery;
  }



  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("category");

    // Delete old image after successful update
    if (req.files.image && oldImagePath) {
      const oldPath = path.join(
        __dirname,
        "..",
        oldImagePath?.split("/")[3],
        oldImagePath?.split("/")[4],
        oldImagePath?.split("/")[5]
      );
      const file = {
        path: oldPath,
      };

      deleteUploadedFiles(file);
    }

    if (req.files.gallery && oldImagePathArr) {
      const oldPath = oldImagePathArr?.map((oldimg) => {
        const obj = {
          path: path.join(
            __dirname,
            "..",
            oldimg?.split("/")[3],
            oldimg?.split("/")[4],
            oldimg?.split("/")[5]
          ),
        };
        return obj;
      });
      deleteUploadedFiles(oldPath);
    }

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { product: updatedProduct },
    });
  } catch (error) {
    // Clean up new file if update fails
    if (req.files.image) {
      deleteUploadedFiles(req.files.image[0]);
    }
    if (req.files.gallery) {
      deleteUploadedFiles(req.files.gallery);
    }
    throw error; // Will be caught by errorWrapper
  }
});

const deleteProduct = errorWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const deletedProduct = await Products.findByIdAndDelete(productId);

  if (!deletedProduct) {
    const error = errorHelper.create(
      "Product not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // Delete associated image
 if (deletedProduct.image) {
      const oldPath = path.join(
        __dirname,
        "..",
        deletedProduct.image?.split("/")[3],
        deletedProduct.image?.split("/")[4],
        deletedProduct.image?.split("/")[5]
      );
      const file = {
        path: oldPath,
      };

      deleteUploadedFiles(file);
    }

   if (deletedProduct.gallery) {
      const oldPath = deletedProduct.gallery?.map((oldimg) => {
        const obj = {
          path: path.join(
            __dirname,
            "..",
            oldimg?.split("/")[3],
            oldimg?.split("/")[4],
            oldimg?.split("/")[5]
          ),
        };
        return obj;
      });
      deleteUploadedFiles(oldPath);
    }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: null,
    message: "Product deleted successfully",
  });
});

const addReview = errorWrapper(async (req, res, next) => {
  const { comment, rating } = req.body;
  const productId = req.params.productId;
  const user = req.user;

  if (!user) {
    return next(
      errorHelper.create(
        "User Not Founded To Add Comment Or Somthing Get Bad",
        500,
        httpStatusText.ERROR
      )
    );
  }
  const review = {
    name: `${user.firstName} ${user.lastName}`,
    comment,
    rating: +rating,
    user: user._id.toString(),
  };

  const product = await Products.findById(productId);

  if (!product) {
    return next(
      errorHelper.create(
        "No Product Founded Or Somthing Got Wrong",
        404,
        httpStatusText.FAIL
      )
    );
  }

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { review: review },
    message: "Review Added Successfuly",
  });
});

const deleteReview = errorWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  const product = await Products.findById(productId);

  if (!product) {
    return next(
      errorHelper.create("Product Not Found", 404, httpStatusText.FAIL)
    );
  }

  // const review =  product.reviews.filter(item => item.user.toString() === req.user._id.toString() && item._id === reviewId )
  const review = await Products.updateOne(
    { _id: productId },
    {
      $pull: {
        reviews: {
          _id: reviewId,
        },
      },
    }
  );
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Review Deleted Successfuly",
  });
});

const getUserReviews = errorWrapper(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  let reviews;
  const products = await Products.find({
    "reviews.user": user._id.toString(),
  }).lean();

  // Extract and flatten reviews
  reviews = products.flatMap((product) =>
    product.reviews
      .filter((review) => review.user.toString() === user._id.toString())
      .map((review) => ({
        ...review,
        product: {
          _id: product._id,
          name: product.name,
        },
      }))
  );

  if (!reviews || reviews.length === 0) {
    return res.status(404).json({ message: "No reviews found" });
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      reviews: reviews,
    },
  });
});

const getUserProductReviews = errorWrapper(async (req, res, next) => {
  const user = req.user;
  const productId = req.params.productId;
  let reviews;
  if (productId) {
    const product = await Products.findById(productId).select("reviews").lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Filter reviews for the current user
    reviews = product.reviews.filter(
      (review) => review.user.toString() === user._id.toString()
    );
  }

  if (!reviews || reviews.length === 0) {
    return res.status(404).json({ message: "No reviews found" });
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      reviews: reviews,
    },
  });
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  deleteReview,
  getUserReviews,
  getUserProductReviews,
};
