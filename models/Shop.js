// const mongoose = require('mongoose');

// const shopSchema = new mongoose.Schema({
//   region: { type: String, required: true }, // north, south, east, west
//   shopName: { type: String, required: true },
//   shopOwnerName: { type: String, required: true },
//   contact: { type: String, required: true },
//   address: { type: String, required: true },
//   location: { type: String, required: true },
//   imageUrl: { type: String } // optional
// }, { timestamps: true });

// module.exports = mongoose.model('Shop', shopSchema);




//Update for DRopdown village or same location wise.

const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  region: { type: String, required: true }, // north, south, east, west
  shopName: { type: String, required: true },
  shopOwnerName: { type: String, required: true },
  contact: { type: String, required: true },
  village: { type: String, required: true }, // village or same location
  address: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String } // optional
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
