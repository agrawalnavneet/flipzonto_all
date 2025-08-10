const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: String,
  contact: String,
  orderDate: Date,
  shopDetails: {
    shopName: String,
    contact: String,
    location: String,
    address: String
  },
  products: Array,
  totalPrice: Number,
  userName: String,
  userContact: String
});

module.exports = mongoose.model('Order', OrderSchema);