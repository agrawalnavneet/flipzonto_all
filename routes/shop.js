// const express = require('express');
// const router = express.Router();
// const Shop = require('../models/Shop');
// const ensureAuth = require('../middleware/authMiddleware');

// const regions = ['north-mon','north-tue','east-wed','east-thu','south-fri', 'west-sat'];

// // Show all shops by region
// regions.forEach(region => {
//   // View all shops
//   router.get(`/${region}/shops`, ensureAuth, async (req, res) => {
//     const shops = await Shop.find({ region });
//     res.render(`${region}/all`, { shops, region });
//   });

//   // Add shop form
//   router.get(`/${region}/shops/create`, ensureAuth, (req, res) => {
//     res.render(`${region}/create`, { region });
//   });

//   // Create shop
//   router.post(`/${region}/shops/create`, ensureAuth, async (req, res) => {
//     const { shopName, shopOwnerName, contact, address, location, imageUrl } = req.body;
//     await Shop.create({ shopName, shopOwnerName, contact, address, location, imageUrl, region });
//     res.redirect(`/${region}/shops`);
//   });

//   // Edit shop form
//   router.get(`/${region}/shops/edit/:id`, ensureAuth, async (req, res) => {
//     const shop = await Shop.findById(req.params.id);
//     res.render(`${region}/edit`, { shop, region });
//   });

//   // Update shop
//   router.post(`/${region}/shops/edit/:id`, ensureAuth, async (req, res) => {
//     const { shopName, shopOwnerName, contact, address, location, imageUrl } = req.body;
//     await Shop.findByIdAndUpdate(req.params.id, {
//       shopName,
//       shopOwnerName,
//       contact,
//       address,
//       location,
//       imageUrl
//     });
//     res.redirect(`/${region}/shops`);
//   });

//   // Delete shop
//   router.post(`/${region}/shops/delete/:id`, ensureAuth, async (req, res) => {
//     await Shop.findByIdAndDelete(req.params.id);
//     res.redirect(`/${region}/shops`);
//   });
// });






// //frontend new react sales panel for fetch all shop
// // New API route to get shops as JSON (not rendered view)
// // New API route to get shops as JSON
// // Remove the ensureAuth middleware to make this route public
// router.get('/api/shops/:region', async (req, res) => {
//   const region = req.params.region;

//   if (!regions.includes(region)) {
//     return res.status(400).json({ error: 'Invalid region' });
//   }

//   try {
//     const shops = await Shop.find({ region });
//     res.json({ shops });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });






// //new sales panel for fetch all shop by id 



// module.exports = router;









const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const ensureAuth = require('../middleware/authMiddleware');

// Define your regions
const regions = ['north-mon', 'north-tue', 'east-wed', 'east-thu', 'south-fri', 'west-sat'];

// Show all shops by region
regions.forEach(region => {
  // View all shops
  router.get(`/${region}/shops`, ensureAuth, async (req, res) => {
    const shops = await Shop.find({ region });
    res.render(`${region}/all`, { shops, region });
  });

  // Add shop form
  router.get(`/${region}/shops/create`, ensureAuth, (req, res) => {
    res.render(`${region}/create`, { region });
  });

  // Create shop
  router.post(`/${region}/shops/create`, ensureAuth, async (req, res) => {
    const { shopName, shopOwnerName, contact,village, address, location, imageUrl } = req.body;
    await Shop.create({ shopName, shopOwnerName, contact, village, address, location, imageUrl, region });
    res.redirect(`/${region}/shops`);
  });

  // Edit shop form
  router.get(`/${region}/shops/edit/:id`, ensureAuth, async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    res.render(`${region}/edit`, { shop, region });
  });

  // Update shop
  router.post(`/${region}/shops/edit/:id`, ensureAuth, async (req, res) => {
    const { shopName, shopOwnerName, contact,village, address, location, imageUrl } = req.body;
    await Shop.findByIdAndUpdate(req.params.id, {
      shopName,
      shopOwnerName,
      contact,
      village, // Update village or same location
      address,
      location,
      imageUrl
    });
    res.redirect(`/${region}/shops`);
  });

  // Delete shop
  router.post(`/${region}/shops/delete/:id`, ensureAuth, async (req, res) => {
    await Shop.findByIdAndDelete(req.params.id);
    res.redirect(`/${region}/shops`);
  });
});

// New API route to get shops as JSON (not rendered view)
router.get('/api/shops/:region', async (req, res) => {
  const region = req.params.region;

  if (!regions.includes(region)) {
    return res.status(400).json({ error: 'Invalid region' });
  }

  try {
    const shops = await Shop.find({ region });
    res.json({ shops });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// New API route to get a specific shop's details by region and shopId
// router.get('/api/shops/:shopId', async (req, res) => {
//   const { shopId } = req.params;

//   try {
//     const shop = await Shop.findById(shopId);
//     if (!shop) {
//       return res.status(404).json({ error: 'Shop not found' });
//     }
//     res.json({ shop });
//   } catch (err) {
//     console.error("Error fetching shop:", err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// New API route to get a specific shop's details by region and shopId
// router.get('/api/shops/:region/:shopId', async (req, res) => {
//   const { region, shopId } = req.params;

//   // Validate region if needed
//   const validRegions = ['north-mon', 'north-tue', 'east-wed', 'east-thu', 'south-fri', 'west-sat'];
//   if (!validRegions.includes(region)) {
//     return res.status(400).json({ error: 'Invalid region' });
//   }

//   try {
//     // Find the shop based on both region and shopId
//     const shop = await Shop.findOne({ _id: shopId, region });
//     if (!shop) {
//       return res.status(404).json({ error: 'Shop not found' });
//     }
//     res.json({ shop });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Route to fetch shop details by region and shopId
router.get('/api/shops/:region/:shopId', async (req, res) => {
  const { region, shopId } = req.params;

  try {
    const shop = await Shop.findOne({ _id: shopId, region: region });  // Find the shop based on shopId and region

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    res.json({ shop });
  } catch (err) {
    console.error('Error fetching shop details:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
