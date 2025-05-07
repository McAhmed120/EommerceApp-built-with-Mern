const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Correct reference
    status: { type: String, enum: ['Pending', 'Shipped', 'Completed', 'Cancelled'], default: 'Pending' },
  });
  
  module.exports = mongoose.model('Order', OrderSchema);
  