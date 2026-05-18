const {uploade} = require('../config/multer');
const errorHelper = require('../utility/errorHelper');
const httpStatusText = require('../utility/httpStatusText');
const fs = require('fs');
const path = require('path');

const handleUploadAvatar = (withResponse = false) => {
  return (req, res, next) => {
  const userBackup = req.user ? {...req.user} : null;
  uploade.single('avatar')(req, res, (err) => {
    if (userBackup) {
      req.user = userBackup;
      res.locals.user = userBackup;
    }
    if(req.file && withResponse) {
      res.json({status: httpStatusText.SUCCESS, data: `${process.env.BACKEND_URL}/uploads/avatars/${req.file.filename}`,  message: "image uploaded successfuly"});
    }
    
    if (err) {
      deleteUploadedFiles(req.file);
      const error = errorHelper.create(err.message, 500, httpStatusText.ERROR);
      return next(error);
    }
    next();
  });
};
}




// Single image upload handler
const handleUploadProduct = (withResponse = false) => {
  return (req, res, next) => {
    const userBackup = req.user ? {...req.user} : null;
    
    uploade.fields([{name: "image", maxCount: 1}, {name: "gallery", maxCount: 10}])(req, res, (err) => {
      // Restore user data
      if (userBackup) {
        req.user = userBackup;
        res.locals.user = userBackup;
      }
      
      // Handle errors
      if (err) {
        deleteUploadedFiles(req.files.image[0]);
        deleteUploadedFiles(req.files.gallery);
        const error = errorHelper.create(
          err.message.includes('File too large') 
            ? 'File size exceeds 10MB limit' 
            : 'Invalid file type. Only images are allowed!',
          400, 
          httpStatusText.FAIL
        );
        return next(error);
      }
      let data = {};
      if (req.files.gallery) {
        const uploadedFiles = req.files.gallery.map(file => 
          `${process.env.BACKEND_URL}/uploads/products/${file.filename}`
        );
        data = {...data, gallery: uploadedFiles};
      }
      // Handle response if needed
      if (req.files.image) {
        data = {...data, image: `${process.env.BACKEND_URL}/uploads/products/${req.files.image[0].filename}`}
      }

      if(withResponse) {
        return res.json({
          status: httpStatusText.SUCCESS,
          data: data,
          message: "Images uploaded successfully"
        });
      }
      
      next();
    });
  };
};




// Helper function to delete uploaded files on error
const deleteUploadedFiles = (files) => {
  if (!files) return;
  
  if (Array.isArray(files)) {
    files.forEach(file => {
      if (file.path) {
        fs.unlink(file.path, err => {
          if (err) console.error(`Error deleting file: ${file.path}`, err);
        });
      }
    });
  } else if (files.path) {
    fs.unlink(files.path, err => {
      if (err) console.error(`Error deleting file: ${files.path}`, err);
    });
  }
};

module.exports = {
  handleUploadAvatar,
  handleUploadProduct,
  deleteUploadedFiles
};