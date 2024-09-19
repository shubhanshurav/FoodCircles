import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { add, remove } from "../../redux/slices/CartSlice";
import { addToCartThunk, removeFromCartThunk } from "../../redux/thunks/cartThunks";

const MenuItemDetail = ({ item, onClose }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

const handleAddToCart = (item) => {
  if (user) {
    dispatch(addToCartThunk(user._id, item, 1)); // Send only item._id
  } else {
    alert("Please log in to add items to your cart.");
  }
};

const handleRemoveFromCart = (itemId) => {
  if (user) {
    // console.log(user, itemId)
    dispatch(removeFromCartThunk(user._id, itemId));
    toast.error("Item removed from Cart");
  } else {
    alert("Please log in to remove items from your cart.");
  }
};
  if (!item) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-white w-4/5 md:w-1/3 p-4 rounded shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-20 md:top-8 right-10 md:right-[35%] text-gray-700 font-bold text-lg"
        >
          ✖
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">{item?.name}</h3>
        {item?.imageId && (
          <img
            src={`${process.env.REACT_APP_ITEM_IMG_CDN_URL}${item?.imageId}`}
            alt={item?.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        <p className="text-gray-700 mb-2">
          <strong>Price:</strong>{" "}
          {item?.price > 0
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(item?.price / 100)
            : "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Description:</strong>{" "}
          {item?.description || "No description available"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Category:</strong> {item?.category || "N/A"}
        </p>
        <div className="text-center flex gap-4 pt-4 m-auto w-fit">
          <div className="">
            {cart?.some((p) => p.menuItem.id === item.id) ? (
              <button
                className="border border-green-700 text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents modal from opening
                  handleRemoveFromCart(item.id);
                }}
              >
                Remove
              </button>
            ) : (
              <button
                className="border border-green-700 text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents modal from opening
                  handleAddToCart(item);
                }}
              >
                Add +
              </button>
            )}
          </div>
          <div>
            <button
              onClick={onClose}
              className="bg-red-500 text-white font-semibold border px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
