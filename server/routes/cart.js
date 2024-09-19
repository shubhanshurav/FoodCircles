const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, menuItem, quantity } = req.body;
  console.log(userId, menuItem);

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find existing item in the cart
    const existingItem = cart.items.find(
      (item) => item.menuItem && item.menuItem.toString() === menuItem
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Increment quantity if item exists
    } else {
      cart.items.push({ userId, menuItem, quantity }); // Add new item
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message,
    });
  }
});

// Remove item from cart
router.post("/remove", async (req, res) => {
  const { userId, menuItemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    console.log("Removing item from cart:", cart);

    // Remove the item by comparing the menuItemId with item.menuItem.id
    cart.items = cart.items.filter(
      (item) => String(item.menuItem) !== String(menuItemId)
    );
    console.log("Cart after removal:", cart.items.length);

    
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({
      success: false,
      message: "Error removing from cart",
      error: error.message,
    });
  }
});


// Get user cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.menuItem"
    );
    if (!cart) return res.status(200).json({ success: true, cart: [] });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
});

module.exports = router;
