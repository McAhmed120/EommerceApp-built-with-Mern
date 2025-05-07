const Product = require('../models/Product');

// Add a new product (Admin only)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        // Ensure required fields are provided
        if (!name || !price || !stock) {
            return res.status(400).json({ message: 'Name, price, and stock are required fields' });
        }

        // Handle the uploaded image file
        const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null; // Ensure cross-platform path handling

        // Create a new product
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        });

        console.log('Product created:', product); // Log the created product

        res.status(201).json(product); // Return the created product
    } catch (error) {
        console.error('Error:', error.message);

        res.status(500).json({ 
            message: 'Failed to add product', 
            error: error.message 
        });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        console.log('Products fetched:', products); // Log fetched products

        res.status(200).json(products);
    } catch (error) {
        console.error('Error:', error.message);

        res.status(500).json({ 
            message: 'Failed to fetch products', 
            error: error.message 
        });
    }
};

// Update an existing product (Admin only)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        // Ensure required fields are provided
        if (!name || !price || !stock) {
            return res.status(400).json({ message: 'Name, price, and stock are required fields' });
        }

        // Handle the uploaded image file
        const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

        // Update the product
        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, stock, imageUrl },
            { new: true } // Return the updated document
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product updated:', product);

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error.message);

        res.status(500).json({ 
            message: 'Failed to update product', 
            error: error.message 
        });
    }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product deleted:', product);

        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        console.error('Error deleting product:', error.message);

        res.status(500).json({ 
            message: 'Failed to delete product', 
            error: error.message 
        });
    }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
