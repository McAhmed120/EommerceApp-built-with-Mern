const express = require('express');
const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), addProduct);
router.get('/', getProducts);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
