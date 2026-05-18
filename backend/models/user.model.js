const mongoose = require('mongoose');
const validator = require('validator');
const errorHelper = require('../utility/errorHelper');
const httpStatusText = require('../utility/httpStatusText');
const roles = require('../utility/roles');


const defaultAddress = {
  street: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  isPrimary: false
};


const addressSchema = new mongoose.Schema({
  street: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  country: { type: String, default: "" },
  isPrimary: { type: Boolean, default: false }
}, { _id: false });

const profileSchema = new mongoose.Schema({
  userName: { type: String, default: "" },
  dateOfBirth: { type: String, default: "" },
  phone: { type: String, default: "" },
  avatar: { type: String, default: "" }
}, { _id: false });

const settingsSchema = new mongoose.Schema({
  theme: { type: String, default: "" },
  language: { type: String, default: "" }
}, { _id: false });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'Please enter a valid email address'] },
  password: { type: String, required: true },
  profile: {
    type: profileSchema,
    default: ()=> ({})
  },
  address: {
    type: [addressSchema],
    default: ()=> []
  },
  settings: {
    type: settingsSchema,
    default: ()=> ({})
  },
  role: { type: String, enum: [roles.CUSTOMER, roles.ADMIN, roles.SELLER], default: roles.CUSTOMER },
   refreshToken: {
    type: String,
    default: null
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});


userSchema.pre('save', function(next) {
  const user = this;
  

  if (user.isModified('address')) {
    const defaultAddresses = user.address.filter(addr => addr.isPrimary);
    
   
    if (defaultAddresses.length > 1) {
      return next(errorHelper.create('No more one primary address can be set', 400, httpStatusText.ERROR));
    }
  }
  
  next();
});


// Transform function to handle sensitive fields + default address
const applyTransforms = (existingTransform) => (doc, ret, options) => {
  // Apply existing transform if available
  let result = existingTransform ? existingTransform(doc, ret, options) || ret : ret;
  
  // Remove sensitive fields (add others as needed)
  delete result.password;
  delete result.__v;
  delete result.refreshToken
  
  // Inject default address if array is empty
  if (Array.isArray(result.address) && result.address.length === 0) {
    result.address = [defaultAddress];
  }
  
  return result;
};


userSchema.set("toJSON", {
  transform: applyTransforms(userSchema.options.toJSON?.transform)
});

userSchema.set("toObject", {
  transform: applyTransforms(userSchema.options.toObject?.transform)
});


module.exports = mongoose.model("User", userSchema);