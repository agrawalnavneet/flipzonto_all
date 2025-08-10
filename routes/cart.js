

const express = require('express');
const router = express.Router();

router.get('/cart', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/'); // If the user is not logged in, redirect to the login page
  }

  // Pass the username (or the entire session user data) to the 'cart' view
  res.render('cart', { user: req.session.user });
});

module.exports = router;