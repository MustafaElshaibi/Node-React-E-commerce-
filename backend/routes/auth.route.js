const express = require('express');
const { getAccessTokenFromRefreshToken, register, login, logout, getProfile, updateProfile } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');
const {handleUploadAvatar} = require('../utility/uploadFiles');
const router = express.Router();


router.route('/protected')
  .post(verifyToken,(req, res)=> {
    res.sendStatus(209);
  })

router.route('/refresh')
  .post(getAccessTokenFromRefreshToken)

  router.route('/login')
    .post(login)

  router.route('/register')
    .post(register)

  router.route('/logout')
    .post(logout)

  router.route('/profile')
    .get(verifyToken,getProfile)

  router.route('/profile')
    .put(verifyToken , handleUploadAvatar(false) ,updateProfile);

    
  module.exports  = router;