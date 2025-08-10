const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

// Serve login on root route
router.get('/', (req, res) => {
  res.render('login');
});

// Optional: Keep /login as alias for login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const admin = await Admin.findOne({ username: id });

    if (admin && await bcrypt.compare(password, admin.password)) {
      req.session.user = id;
      res.redirect('/dashboard');
    } else {
      res.send("Invalid credentials");
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send("Server error");
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


// Dashboard route
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/');
    }
  
    // Passing the correct variable to the view
    res.render('dashboard', { user: req.session.user });
  });

module.exports = router;
