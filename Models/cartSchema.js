const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  items: [
    {
      tireStyle: String,
      size: String,
      price: Number,
      imageUrl: String,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);