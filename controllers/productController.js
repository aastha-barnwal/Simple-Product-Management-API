
const Product = require('../models/Product');
const { Op } = require('sequelize');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
     // Validate required fields and their types
     if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
    }
    if (typeof price !== 'number' || isNaN(price)) {
      return res.status(400).json({ error: 'Price is required and must be a valid number.' });
    }

    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ error: 'Category is required and must be a non-empty string.' });
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string if provided.' });
    }
    const product = await Product.create({ name, price, description, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all products

exports.getProducts = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    // Parse the page and limit parameters to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * limitNumber;
    // Create the where clause for searching
    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { category: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    // Fetch products with pagination and search
    const products = await Product.findAndCountAll({
      where,
      limit: limitNumber,
      offset: offset,
    });
  
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limitNumber),
      currentPage: pageNumber,
      products: products.rows,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
    