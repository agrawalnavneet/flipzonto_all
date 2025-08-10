
const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Your Mongoose model
const Shop = require('../models/Shop');    // In case you want to reference it later

// Middleware to parse JSON
router.use(express.json());

router.post('/confirm-order', async (req, res) => {
  try {
    const { 
      userName, 
      userContact, 
      shopName, 
      shopContact, 
      shopLocation, 
      shopAddress, 
      orderDate, 
      totalPrice, 
      orderItems 
    } = req.body;

    const newOrder = new Order({
      customerName: userName,
      userName,
      userContact,
      contact: userContact,
      orderDate: new Date(orderDate),
      shopDetails: {
        shopName,
        contact: shopContact,
        location: shopLocation,
        address: shopAddress
      },
      products: JSON.parse(orderItems),
      totalPrice
    });

    await newOrder.save();

    res.status(200).json({ message: 'Order placed successfully!' });

  } catch (error) {
    console.error('❌ Error saving order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;