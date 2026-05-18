const multer = require('multer');
const errorHelper = require('../utility/errorHelper');
const path = require('path');
const fs = require('fs');

const BASE_PATH = 'uploads';
const NESTED_PATHS = {
  AVATARS: 'avatars',
  PRODUCTS: 'products',

}

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    // const uploadDir = path.join(__dirname, '../uploads/avatars');
    let uploadDir = path.join(__dirname, '..' , BASE_PATH);
    if(file.fieldname === 'avatar') 
      uploadDir = path.join(__dirname, '..' , BASE_PATH, NESTED_PATHS.AVATARS);
    else if (file.fieldname === 'image' || file.fieldname === 'gallery')
      uploadDir = path.join(__dirname, '..', BASE_PATH, NESTED_PATHS.PRODUCTS);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb)=> {
    const ext = file.mimetype.split('/')[1];
    const filename = `${file.originalname.split(' ').join('-').split('.')[0]}-${Date.now()}.${ext}`;
    cb(null, filename);
  }
})


const fileFilter = (req, file, cb)=> {
  if(file.mimetype.split('/')[0] === "image") {
   return cb(null, true);
  } else {
   return cb(errorHelper.create('only images are allowed', 400, 'error'), false);
  }
}

const uploade = multer({ storage: storage, fileFilter})


module.exports  = {
  uploade
};

