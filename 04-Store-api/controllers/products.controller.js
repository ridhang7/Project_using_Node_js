const Product = require("../models/products.models");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

const getAllProductsList = asyncWrapper(async (req, res) => {
  const { featured, company, rating, product_name, sort, fields} =
    req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = company;
  }
  if (rating) {
    queryObject.rating = rating;
  }
  if (product_name) {
    queryObject.product_name = { $regex: product_name, $options: "i" };
  }
  // console.log(queryObject);
  let results = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    results = results.select(fieldsList);
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page -1) * limit
  results = results.skip(skip).limit(limit);

  const product = await results;
  res.status(200).json({ nbHits: product.length, product });
});

const getProductsItem = asyncWrapper(async (req, res) => {
  const { productsId } = req.params;
  const product = await Product.findOne({ _id: productsId });
  res.status(200).json({ product });
});

const addProduct = asyncWrapper(async (req, res) => {
  const products = await Product.create(req.body);
  res.status(201).json({ products });
});

const searchProduct = asyncWrapper(async (req, res) => {
  const products = await Product.create(req.body);
  res.status(201).json({ products });
});

module.exports = { getAllProductsList, getProductsItem, addProduct };
