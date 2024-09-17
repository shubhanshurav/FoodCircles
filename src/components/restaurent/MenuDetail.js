import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { add, remove } from "../../redux/slices/CartSlice";

const MenuItemDetail = ({ item, onClose }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(add(item));
    toast.success("Item added to Cart");
  };

  const removeFromCart = (itemId) => {
    dispatch(remove(itemId));
    toast.error("Item removed from Cart");
  };

  if (!item) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-4/5 md:w-1/3 p-4 rounded shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 font-bold text-lg"
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
            {cart.some((p) => p.id === item.id) ? (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents modal from opening
                  removeFromCart(item?.id);
                }}
                className="border border-green-700 text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents modal from opening
                  addToCart(item);
                }}
                className="border border-green-700 text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
              >
                ADD +
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