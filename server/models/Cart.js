const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      menuItem: [],
      // menuItem: { type: Map, of: mongoose.Schema.Types.Mixed },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
