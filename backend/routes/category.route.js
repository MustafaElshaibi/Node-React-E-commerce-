const express = require('express');
const router = express.Router();
const {getAllCategories, addCategory, getCategory, updateCategory, deleteCategory} = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken');
const allowdTo = require('../middlewares/allowedTo');
const roles = require('../utility/roles')

router.route('/')
    .get(getAllCategories)
    .post(verifyToken, allowdTo(roles.ADMIN, roles.SELLER), addCategory)


    router.route('/:categoryId')
    .get(getCategory)
    .put(verifyToken, allowdTo(roles.ADMIN, roles.SELLER), updateCategory)
    .delete(verifyToken, allowdTo(roles.ADMIN, roles.SELLER), deleteCategory)

  
    module.exports = router;