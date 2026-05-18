const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const {handleUploadAvatar, handleUploadProduct} = require('../utility/uploadFiles');
const roles = require('../utility/roles');
const router = express.Router();


router.route('/avatar')
  .post(verifyToken, handleUploadAvatar(true))

router.route('/product')
  .post(verifyToken, allowedTo(roles.ADMIN, roles.SELLER), handleUploadProduct(true))

    
  module.exports  = router;