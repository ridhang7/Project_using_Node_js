const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: [true, "product name is a mandatory"]
  },
  price:{
    type: Number,
    required: [true, "product price is a mandatory"]
  },
  featured: {
    type:Boolean,
    default: false
  },
  rating:{
    type: Number,
    default: 4.5,
    min : 0,
    max : 5,
  },
  company: {
    type: String,
    enum:{values: ['Ikea','LG', 'Microsoft', 'Maersk'],msg: '{VALUE} is not supported'},
    required: [true,"Company name is req"]
  },
  createAt: { 
    type: Date, 
    default: Date.now()
  }
});

module.exports = mongoose.model("store-api", ProductSchema);
