const errorWrapperMiddleware = require('../middlewares/errorWrapper.middleware');
const Category = require('../models/category.model');
const errorHelper = require('../utility/errorHelper');
const httpStatusText = require('../utility/httpStatusText');

const addCategory = errorWrapperMiddleware(async (req, res, next) => {
  const {name} = req.body;

  if(!name) {
    return next(errorHelper.create('Category name is required', 400, httpStatusText.FAIL));
  }

  const isExist = await Category.findOne({name: name});



  if(isExist) {
    return next(errorHelper.create('This Category is already exist', 400, httpStatusText.FAIL));
  }

  const cat = new Category({
    name: name
  });

  await cat.save();

  return  res.status(201).json({status: httpStatusText.SUCCESS, data: {category: cat.toObject()}, message: 'Category is created successfuly'});

});

const getAllCategories = errorWrapperMiddleware(async(req, res, next)=> {
  const categories = await Category.find({});
  if(!categories) {
    return next(errorHelper.create('Categories is Empty', 400, httpStatusText.FAIL));
  }

  return res.status(200).json({status: httpStatusText.SUCCESS, data: {categories: categories}});
})


const getCategory = errorWrapperMiddleware(async (req, res, next)=> {
  const catId = req.params.categoryId;
  const category = await Category.findById(catId);

  if(!category) {
    return next(errorHelper.create('Category not found', 404, httpStatusText.FAIL));
  }

  return res.status(200).json({status: httpStatusText.SUCCESS, data: {category: category}})

})

const updateCategory = errorWrapperMiddleware(async (req, res, next)=> {
  const catId = req.params.categoryId;
  const {name} = req.body;
  
  if(!name) {
    return next(errorHelper.create('name is required', 400, httpStatusText.FAIL));
  }

  const oldCategory = await Category.findByIdAndUpdate(catId, {name: name}, {new: true, runValidators: true});
  
  if(!oldCategory) {
    return next(errorHelper.create('Category not found', 404, httpStatusText.FAIL));
  }

  return  res.status(200).json({status: httpStatusText.SUCCESS, data: {category: oldCategory}})

})


const deleteCategory = errorWrapperMiddleware(async (req, res, next)=> {
  const catId = req.params.categoryId;
  

  const oldCategory = await Category.findByIdAndDelete(catId);
  
  if(!oldCategory) {
    return next(errorHelper.create('Category not found', 404, httpStatusText.FAIL));
  }

  return  res.status(200).json({status: httpStatusText.SUCCESS, data: null, messgae: 'Category Deleted Successfuly'})

})

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
}