const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const roles = require('../utility/roles');


router.route('/')
  .get(verifyToken, allowedTo(roles.ADMIN), userController.getAllUsers)
  .post(verifyToken, allowedTo(roles.ADMIN), userController.setUser);


  router.route('/:userId')
  .get(verifyToken, allowedTo(roles.ADMIN, roles.CUSTOMER, roles.SELLER), userController.getUser)
  .put(verifyToken, allowedTo(roles.ADMIN, roles.CUSTOMER, roles.SELLER), userController.updateUser)
  .delete(verifyToken, allowedTo(roles.ADMIN), userController.deleteUser);



  module.exports  = router;