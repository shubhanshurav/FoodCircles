import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { resetCart } from "../../redux/slices/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart || []);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  console.log(cart);

  useEffect(() => {
    // Calculate total amount
    const cartTotal = cart.reduce((acc, curr) => {
      // Ensure price and quantity are valid
      const price = curr.menuItem.price || 0;
      const quantity = curr.quantity || 0;
      // console.log(price,quantity);
      return acc + price * quantity;
    }, 0);

    // Convert to rupees and set total amount
    const totalRupee = cartTotal / 100;
    setTotalAmount(totalRupee.toFixed(2));
  }, [cart]);

  const clearCart = () => {
    dispatch(resetCart());
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          <div className="shadow-lg">
            {cart.map((item) => (
              <CartItem key={item.menuItem.id} item={item.menuItem} />
            ))}
          </div>
          <div className="shadow-lg pb-8">
            <div className="text-center py-4 md:py-6">
              <p className="font-bold text-2xl text-gray-600">
                Total Items:
                <span className="text-yellow-500 px-2">{cart.length}</span>
              </p>
              <p className="font-bold text-2xl text-gray-600">
                Total Amount:{" "}
                <span className="text-yellow-500">₹{totalAmount}</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center w-fit m-auto md:flex-row">
              <div className="py-2 md:pt-7 text-center">
                <Link to="/checkout">
                  <button className="bg-yellow-500 border-2 border-yellow-500 rounded-xl font-bold text-sm text-red-800 p-2 hover:bg-yellow-600">
                    Pay Now
                  </button>
                </Link>
              </div>
              <div className="py-2 md:pt-7 text-center">
                <button
                  onClick={clearCart}
                  className="bg-red-700 border-2 border-red-700 rounded-xl font-bold text-sm text-white p-2 hover:bg-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center items-center my-52">
          <h1 className="font-semibold text-3xl font-chakra-petch m-7">
            Cart Empty
          </h1>
          <Link to="/">
            <button className="bg-yellow-600 border-2 border-yellow-600 rounded-lg text-md text-white py-2 px-2 font-chakra-petch font-extralight hover:bg-yellow-700">
              Order Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
