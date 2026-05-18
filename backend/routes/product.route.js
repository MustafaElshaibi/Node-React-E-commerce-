const express = require("express");
const coursesController = require("../controllers/product.controller");
const { updateProductMiddleware, addProductMiddleware } = require("../middlewares/product.middleware");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const roles = require("../utility/roles");
const {handleUploadProduct} = require('../utility/uploadFiles');

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllProducts)
  .post(
    verifyToken,
    allowedTo(roles.ADMIN, roles.SELLER),
    handleUploadProduct(false),
    coursesController.addProduct,
  );
  
  router.route('/reviews')
  .get(verifyToken, coursesController.getUserReviews)

router
  .route("/:productId")
  .get(coursesController.getSingleProduct)
  .put(
    verifyToken,
    allowedTo(roles.ADMIN, roles.SELLER),
    handleUploadProduct(false),
    coursesController.updateProduct
  )
  .delete(verifyToken, allowedTo(roles.ADMIN, roles.SELLER),coursesController.deleteProduct);


  router.route('/:productId/reviews')
  .get(verifyToken, coursesController.getUserProductReviews)
  .post(verifyToken,coursesController.addReview)



  router.route('/:productId/review/:reviewId')
  .delete(verifyToken, coursesController.deleteReview)

 
module.exports = router;
