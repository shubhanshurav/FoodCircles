import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuShimmer } from "../Shimmer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRestaurant from "../../hooks/useRestaurant";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import MenuItemDetail from "../restaurent/MenuDetail"; // Import the modal component
import {
  addToCartThunk,
  removeFromCartThunk,
} from "../../redux/thunks/cartThunks";

const IMG_CDN_URL = process.env.REACT_APP_IMG_CDN_URL;
const ITEM_IMG_CDN_URL = process.env.REACT_APP_ITEM_IMG_CDN_URL;

const RestaurantMenu = () => {
  const { resId } = useParams(); // find resId from URL using useParams hook
  const restaurant = useRestaurant(resId); // store the API data in restaurant
  const menuItems = useRestaurantMenu(resId);
  const cart = useSelector((state) => state.cart?.cart || []); // Ensure fallback to empty array if cart is undefined
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  // console.log(cart)

  // State to manage the selected item and modal visibility
  const [selectedItem, setSelectedItem] = useState(null);

const handleAddToCart = (item) => {
    // console.log("Adding item to cart:", item);
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

  // Function to handle opening the modal
  const openModal = (item) => {
    setSelectedItem(item);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedItem(null);
  };

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="px-4 md:px-40 py-8 shadow-2xl">
      {/* Restaurant details */}
      <div className="pt-3 px-4 border">
        <h1 className="text-2xl text-gray-600 border-b-4 border-gray-600 w-fit m-auto px-1 font-extrabold text-center">
          Restaurant Details
        </h1>
        <div className="flex justify-between pt-4 border-b py-5 items-center">
          <div>
            <div className="flex items-center pb-2">
              <img
                className="w-16 md:w-20 h-16 md:h-20 p-[2px] border-4 border-red-900 rounded-full"
                src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
                alt={restaurant?.name}
              />
              <h2 className="text-xl md:text-3xl px-2 font-extrabold pb-2 text-gray-800">
                {restaurant?.name}
              </h2>
            </div>
            <p className="text-md font-thin text-gray-500">
              {restaurant?.cuisines?.join(", ")}
            </p>
            <p className="text-md font-thin text-gray-500">
              {restaurant?.areaName} , {restaurant?.city} |{" "}
              {restaurant?.sla?.lastMileTravelString}
            </p>
          </div>
          <div>
            <p className="text-md border p-1 text-center">
              <span className="rounded-full text-[12px] bg-green-600 m-1">
                ⭐
              </span>
              {restaurant?.avgRating}
            </p>
            <p className="text-sm border p-1 text-center text-gray-700">
              {restaurant?.totalRatingsString}
            </p>
          </div>
        </div>
        <div className="flex font-bold py-2 justify-between">
          <p className="text-gray-700">⌚ {restaurant?.sla?.slaString} </p>
          <p className="text-gray-700">®️ {restaurant?.costForTwoMessage}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div>
        <div className="py-4">
          <div className="py-2">
            <h3 className="font-extrabold text-gray-800 text-xl">
              Recommended ({menuItems.length})
            </h3>
          </div>
          <div className="border px-6 shadow-lg">
            <h3 className="text-[15px] font-bold text-yellow-500 pt-4">
              ⭐ Bestseller
            </h3>
            {menuItems?.map((item) => (
              <div
                className="flex justify-between border-b border-gray-300 mb-6 items-center cursor-pointer"
                key={item?.id}
                onClick={() => openModal(item)}
              >
                <div className="w-[65%] md:w-[75%]">
                  <h3 className="text-md font-bold text-gray-800">
                    {item?.name}
                  </h3>
                  <p className="text-[15px] font-semibold text-gray-600">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                    <span className="text-orange-500 font-light text-[10px] bg-orange-200 m-1">
                      | 50% OFF | USE TRYNEW
                    </span>
                  </p>
                  <p className="py-3 text-gray-400 text-sm">
                    {item?.description}
                  </p>
                </div>
                <div className="m-auto text-center py-4 px-2">
                  {item?.imageId && (
                    <img
                      className="w-36 h-24 rounded-2xl shadow-lg"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <div className="-mt-5">
                    {cart?.some((p) => p?.menuItem?.id === item?.id) ? (
                      <button
                        className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromCart(item.id);
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents modal from opening
                          handleAddToCart(item);
                        }}
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Item Details Modal */}
      {selectedItem && (
        <MenuItemDetail item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
};

export default RestaurantMenu;
