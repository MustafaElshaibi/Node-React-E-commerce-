const errorHelper = require("../utility/errorHelper");
const errorWrapper = require("../middlewares/errorWrapper.middleware");
const httpStatusText = require("../utility/httpStatusText");
const User = require("../models/user.model");
const { generateAccessToken } = require("../utility/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utility/generateToken");
const sendRefreshToken = require('../utility/sendRefreshToken');
const {deleteUploadedFiles} = require('../utility/uploadFiles');
const fs = require("fs");
const path = require("path");

const getAccessTokenFromRefreshToken = errorWrapper(async (req, res, next) => {
  const  refreshToken  = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(
      errorHelper.create("Refresh token is required", 400, httpStatusText.FAIL)
    );
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return next(
            errorHelper.create(
              "Refresh token expired",
              401,
              httpStatusText.FAIL
            )
          );
        }
        return next( 
          errorHelper.create("Invalid refresh token", 401, httpStatusText.FAIL)
        );
      }
      return decoded;
    }
  );
  if (!decoded) return;
  const user = await User.findById(decoded.id.toString());

  if (!user) {
    return next(
      errorHelper.create(
        "User not found or refresh token is invalid",
        404,
        httpStatusText.FAIL
      )
    );
  }

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  if (!accessToken) {
    return next(
      errorHelper.create(
        "Failed to generate access token",
        500,
        httpStatusText.FAIL
      )
    );
  }

  sendRefreshToken(res, refreshToken);

  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Access token generated successfully",
      data: {accessToken},
    });
});

const register = errorWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = errorHelper.create(
      "this email is already exists",
      400,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const hashedPass = await bcrypt.hash(String(password), 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    role,
    password: hashedPass,
  });

  const accessToken = generateToken.generateAccessToken( {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });
  const refreshToken = generateToken.generateRefreshToken({
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });
  newUser.refreshToken = refreshToken;

  // send refresh token via httpOnly cookie 
  sendRefreshToken(res, refreshToken);

  await newUser.save();
  const data = {
    ...newUser.toObject(),
    accessToken,
  };

  res
    .status(201)
    .json({
      status: httpStatusText.SUCCESS,
      data: { user: data },
      message: "user created successfully",
    });
});

const login = errorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    const error = errorHelper.create(
      "email doesn't exist",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const passwordMatch = await bcrypt.compare(
    String(password),
    oldUser.password
  );
  if (!passwordMatch) {
    const error = errorHelper.create(
      "password is not correct",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  const accessToken = generateToken.generateAccessToken({
    id: oldUser._id,
    email: oldUser.email,
    role: oldUser.role,
  });
  const refreshToken = generateToken.generateRefreshToken({
    id: oldUser._id,
    email: oldUser.email,
    role: oldUser.role,
  });
  const user = await User.findByIdAndUpdate(
    oldUser._id,
    { $set: { refreshToken: refreshToken } },
    { new: true }
  );
  const data = {
    ...user.toObject(),
    accessToken,
  };

  sendRefreshToken(res, refreshToken);

  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      data: { user: data },
      message: "user logged in successfully",
    });
});

const logout = errorWrapper(async (req, res, next) => {
  const  refreshToken  = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(
      errorHelper.create("Refresh token is required", 400, httpStatusText.FAIL)
    );
  }
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        return next(
          errorHelper.create("Invalid refresh token", 401, httpStatusText.FAIL)
        );
      }
      return decoded;
    }
  );
  if (!decoded) return;
  const user = await User.findByIdAndUpdate(decoded.id, {$set: {refreshToken: null}}, {new: true});
  if (!user) {
    return next(
      errorHelper.create(
        "User Logged out or refresh token is invalid",
        404,
        httpStatusText.FAIL
      )
    );
  }
  
   res.clearCookie("refreshToken", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  res.sendStatus(204);
});

const getProfile = errorWrapper(async (req, res, next)=> {
  const user = await User.findById(req.user._id).select('-password -refreshToken');
  if(!user) {
    const error = errorHelper.create('user not found', 404, httpStatusText.FAIL);
    next(error);
  }
  const data = {
   ...user.toObject()
  }
  res.status(200).json({status: httpStatusText.SUCCESS, data: {user: data}});
})


const updateProfile = errorWrapper(async (req, res, next) => {
  const user = req.user || res.locals.user;

  if (!user || !user._id) {
    return next(errorHelper.create(
      'User authentication missing', 
      401, 
      httpStatusText.ERROR
    ));
  }

  const userId = user._id.toString();
  const updateData = req.body;
  

  const disallowedFields = ['password', 'refreshToken', 'email', 'role', 'createdAt', '_id'];
  disallowedFields.forEach(field => delete updateData[field]);
  if (req.file) {
    updateData['profile.avatar'] = `${process.env.BACKEND_URL}/uploads/avatars/${req.file.filename}`;

    if (req.user.profile?.avatar) {
      const oldPath = path.join(__dirname, '..', req.user.profile?.avatar?.split('/')[3],  req.user.profile?.avatar?.split('/')[4], req.user.profile?.avatar?.split('/')[5]);
      const file = {
        path: oldPath
      }
      deleteUploadedFiles(file)
    }
  }
  
  
 const updatedUser = await User.findByIdAndUpdate(
  userId,
  { $set: updateData },
  { 
    new: true,
    runValidators: true
  }
).select('-password -refreshToken -__v');

  if (!updatedUser) {
    return next(errorHelper.create(
      'User not found', 
      404, 
      httpStatusText.FAIL
    ));
  }

  const data = {
    ...updatedUser.toObject()
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Profile updated successfully",
    data: { user: data }
  });
});

module.exports = {
  getAccessTokenFromRefreshToken,
  register,
  login,
  logout,
  getProfile,
  updateProfile
};
