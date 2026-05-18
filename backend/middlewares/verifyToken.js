const errorHelper = require("../utility/errorHelper");
const httpStatusText = require('../utility/httpStatusText');
const User = require('../models/user.model');
const errorWrapper = require('../middlewares/errorWrapper.middleware');
const jwt = require('jsonwebtoken');

const verifyToken = errorWrapper(async (req, res, next) => {
  // 1. More robust header extraction
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return next(errorHelper.create(
      'Authorization token required in "Bearer <token>" format', 
      401, 
      httpStatusText.ERROR
    ));
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // 2. Verify token and handle different error types
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // 3. Add token to request for potential logging/auditing
    req.token = token;
    
    // 4. More efficient user lookup
    const user = await User.findById(decoded.id)
      .select('-password -refreshToken -__v')
      .lean();
    
    if (!user) {
      return next(errorHelper.create(
        'User belonging to this token no longer exists', 
        401, 
        httpStatusText.ERROR
      ));
    }
    
    // 5. Add user to request
    req.user = user;
    next();
  } catch (error) {
    // 6. Handle different JWT error types
    let message = 'Invalid token';
    if (error.name === 'TokenExpiredError') {
      message = 'Token expired';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Malformed token';
    }
    
    return next(errorHelper.create(
      message, 
      401, 
      httpStatusText.ERROR
    ));
  }
});

module.exports = verifyToken;