const express = require('express');
const { 
    createOrder, 
    getClientOrders, 
    getAllOrders, 
    cancelOrder, 
    updateOrderStatus, 
    deleteOrder, 
    editOrder ,
    getOrderById
} = require('../controllers/orderController');
const { protect, clientOnly, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Create an order (Client only)
router.post('/', protect, clientOnly, createOrder);

// Get client-specific orders 
router.get('/', protect, clientOnly, getClientOrders);

// Get all orders (Admin only)
router.get('/all', protect, adminOnly, getAllOrders);

// Cancel an order (Client only)
router.put('/cancel/:orderId', protect, clientOnly, cancelOrder);

// Update order status (Admin only)
router.put('/status/:orderId', protect, adminOnly, updateOrderStatus);

// Delete an order (Admin only)
router.delete('/:orderId', protect, adminOnly, deleteOrder);

// Edit an order (Admin and Client)
router.put('/edit/:orderId', protect, editOrder);

// Get order by ID (Admin only)
router.get('/:id', protect, adminOnly, getOrderById);


module.exports = router;
