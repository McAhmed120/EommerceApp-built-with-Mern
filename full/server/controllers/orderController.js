const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
        return res.status(400).json({ message: 'No products provided in the order' });
    }

    try {
        // Calculate total price
        const totalPrice = products.reduce((total, item) => total + item.quantity * 100, 0); // Assuming each product price is 100 (replace with your logic)

        const order = await Order.create({
            products,
            totalPrice,
            clientId: req.user.id, // Added by middleware
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// New function to get client-specific orders
const getClientOrders = async (req, res) => {
    try {
        // Find all orders for the logged-in client
        const orders = await Order.find({ clientId: req.user.id }).populate('products.product', 'name price');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('products.product', 'name price') // Ensure this field exists in your schema
        .populate('clientId', 'username email phone'); // Ensure this references the correct User schema
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found' });
      }
  
      console.log('Fetched Orders:', orders); // Check the structure of the orders in the console
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
  };
  
  
// New function to cancel a client-specific order
const cancelOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the logged-in client owns the order
        if (order.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only cancel your own orders' });
        }

        // Check if the order is already completed or cancelled
        if (order.status === 'Completed' || order.status === 'Cancelled') {
            return res.status(400).json({ message: `Order is already ${order.status}` });
        }

        // Update the order status to 'Cancelled'
        order.status = 'Cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel order', error: error.message });
    }
};

// New function to update the status of an order by an admin
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; // The new status provided by the admin

    // Validate the status
    const validStatuses = ['Pending', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the status
        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find and delete the order
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
};

// Function to edit an order (Admin and Client)
const editOrder = async (req, res) => {
    const { orderId } = req.params;
    const { products } = req.body; // Updated product details

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check permissions
        if (req.user.role === 'Client' && order.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own orders' });
        }

        // Update order details
        if (products) {
            order.products = products;
            // Recalculate total price (assuming each product has a `price` field)
            order.totalPrice = products.reduce((total, item) => total + item.quantity * item.price, 0);
        }

        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error: error.message });
    }
};
// Get order by ID (Admin only)
const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id); // Find the order by ID
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order); // Respond with the order details
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while fetching order by ID" });
    }
  };

module.exports = { 
    createOrder, 
    getClientOrders, 
    getAllOrders, 
    cancelOrder, 
    updateOrderStatus, 
    deleteOrder, 
    editOrder ,
    getOrderById
};