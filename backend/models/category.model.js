const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is requried'],
    unique: true,
  }
})

module.exports = mongoose.model('Category', categorySchema);