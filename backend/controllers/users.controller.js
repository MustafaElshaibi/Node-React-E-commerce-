const errorWrapper = require("../middlewares/errorWrapper.middleware");
const Users = require("../models/user.model");
const errorHelper = require("../utility/errorHelper");
const httpStatusText = require("../utility/httpStatusText");
const bcrypt = require("bcrypt");
const path = require("path");
const ApiFeatures = require("../utility/ApiFeatures");
const { deleteUploadedFiles } = require("../utility/uploadFiles");

const getAllUsers = errorWrapper(async (req, res) => {
  const features = new ApiFeatures(Users.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .textSearch()
    .paginate();
  const { results, pagination } = await (await features).execute();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      count: results.length,
      pagination,
      users: results,
    },
  });
});

const setUser = errorWrapper(async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  const oldUser = await Users.findOne({ email: email });
  if (oldUser) {
    const error = errorHelper.create(
      "this email is already exists",
      400,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const hashedPass = await bcrypt.hash(String(password), 10);
  const newUser = new Users({
    username: userName,
    email,
    role,
    password: hashedPass,
  });

  await newUser.save();
  const data = {
    ...newUser.toObject(),
  };

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { user: data },
    message: "user created successfully",
  });
});

const getUser = errorWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const User = await Users.findById(userId).select(
    "-password -refreshToken -__v "
  );
  if (!User) {
    const error = errorHelper.create(
      "User not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user: User },
    message: "user fetched successfully",
  });
});

const updateUser = errorWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const updateData = req.body;

  const disallowedFields = [
    "password",
    "refreshToken",
    "email",
    "role",
    "createdAt",
    "_id",
  ];
  disallowedFields.forEach((field) => delete updateData[field]);

  if (req.file) {
    updateData[
      "profile.avatar"
    ] = `${process.env.BACKEND_URL}/uploads/avatars/${req.file.filename}`;

    if (req.user.profile?.avatar) {
      const oldPath = path.join(
        __dirname,
        "..",
        req.user.profile?.avatar?.split("/")[3],
        req.user.profile?.avatar?.split("/")[4],
        req.user.profile?.avatar?.split("/")[5]
      );
      const file = {
        path: oldPath,
      };
      deleteUploadedFiles(file);
    }
  }

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -refreshToken -__v");

  if (!updatedUser) {
    return next(errorHelper.create("User not found", 404, httpStatusText.FAIL));
  }

  const data = {
    ...updatedUser.toObject(),
  };

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Profile updated successfully",
    data: { user: data },
  });
});

const deleteUser = errorWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const oldUser = await Users.findById(userId);
  if (!oldUser) {
    const error = errorHelper.create(
      "user not found",
      404,
      httpStatusText.ERROR
    );
    return next(error);
  }
  const deletedUser = await Users.findByIdAndDelete(userId);
  if (!deletedUser) {
    const error = errorHelper.create(
      "error while deleting user",
      500,
      httpStatusText.ERROR
    );
    return next(error);
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: null,
    message: "user deleted successfully",
  });
});

module.exports = {
  getAllUsers,
  setUser,
  getUser,
  updateUser,
  deleteUser,
};
