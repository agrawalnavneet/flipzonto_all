
const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const Order = require('../models/order');

// GET route for order page with shop details
router.get('/order-:shopName&:contact', async (req, res) => {
  const shopName = decodeURIComponent(req.params.shopName);
  const contact = req.params.contact;

  try {
    const shop = await Shop.findOne({ shopName, contact });
  
    if (!shop) {
      return res.status(404).send('Shop not found');
    }
  
    res.render('orderPage', { shopDetails: shop });
  } catch (error) {
    console.error('Error fetching shop info:', error);
    res.status(500).send('Server error');
  }
});

// POST route for confirming and saving the order
router.post('/confirm-order', async (req, res) => {
  try {
    const {
      userName,
      userContact,
      shopName,
      shopContact,
      orderDate,
      totalPrice,
      orderItems
    } = req.body;

    if (!userName || !userContact || !shopName || !shopContact || !orderItems) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let parsedItems;
    try {
      parsedItems = typeof orderItems === 'string' ? JSON.parse(orderItems) : orderItems;
    } catch (parseError) {
      return res.status(400).json({ message: 'Invalid orderItems format' });
    }

    const newOrder = new Order({
      customerName: userName,
      contact: userContact,
      orderDate: new Date(orderDate || Date.now()),
      shopDetails: {
        shopName,
        contact: shopContact
      },
      products: parsedItems,
      totalPrice,
      userName,
      userContact
    });

    await newOrder.save();

    // Send a success response
    res.json({ message: 'Order placed successfully!' });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});





router.get("/order", (req, res) => {
  const shopDetails = {
    shopName: req.query.shopName,
    shopOwnerName: req.query.owner,
    contact: req.query.contact,
    address: req.query.address,
    location: req.query.location,
  };

  res.render("order", { shopDetails });
});






module.exports = router;