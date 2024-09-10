import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import {MenuShimmer} from "./Shimmer";
import {MENU_API, ITEM_IMG_CDN_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY, IMG_CDN_URL} from "../constants";
import { add, remove} from '../redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

const RestaurantMenu = () => {
  const { resId } = useParams(); // find resId from url using useParams hook
  const [restaurant, setRestaurant] = useState(null); // store the api data in restaurant
  const [menuItems, setMenuItems] = useState([]);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(resId);

  useEffect(() => {
    getRestaurantInfo(); 
  },[]);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();
      console.log("menu", response);
      
      // Set restaurant data
      const restaurantData = json?.data?.cards?.map(x => x.card)?.find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      setRestaurant(restaurantData);
      
      // Set menu item data
      const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(x => x.card?.card)?.filter(x=> x['@type'] === MENU_ITEM_TYPE_KEY)?.map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
      
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
        console.log(item);
      })
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  const addToCart = (item) => {
    dispatch(add(item));
    toast.success("Item added to Cart");
  }

  const removeFromCart = (itemId) => {
    dispatch(remove(itemId));
    toast.error("Item removed from Cart");
  }

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="px-4 md:px-40 py-8 shadow-2xl">
      <div className="pt-3 px-4 border" >
        <h1 className="text-2xl text-gray-600 border-b-4 border-gray-600 w-fit m-auto px-1 font-extrabold text-center">Restaurant Details</h1>
        <div className="flex justify-between pt-4 border-b py-5 items-center">
          <div>
            <div className="flex items-center pb-2">
                <img
                  className="w-16 md:w-20 h-16 md:h-20 p-[2px] border-4 border-red-900 rounded-full"
                  src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
                  alt={restaurant?.name}
                />
               <h2 className="text-xl md:text-3xl px-2 font-extrabold pb-2 text-gray-800">{restaurant?.name}</h2>
            </div>
            <p className="text-md font-thin text-gray-500">{restaurant?.cuisines?.join(", ")}</p>
            <p className="text-md font-thin text-gray-500">{restaurant?.areaName} , {restaurant?.city}  | {restaurant?.sla?.lastMileTravelString}</p>
          </div>
          <div>
            <p className="text-md border p-1 text-center"><span className="rounded-full text-[12px] bg-green-600 m-1" >⭐</span>{restaurant?.avgRating}</p>
            <p className="text-sm border p-1 text-center text-gray-700">{restaurant?.totalRatingsString}</p>
          </div>
        </div>
        <div className="flex font-bold py-2 justify-between" >
            <p className="text-gray-700">⌚ {restaurant?.sla?.slaString} </p>
            <p className="text-gray-700">®️ {restaurant?.costForTwoMessage}</p>
        </div>
      </div>

      <div>
        <div className="py-4">
          <div className="py-2">
            <h3 className="font-extrabold text-gray-800 text-xl" >Recommended({menuItems.length})</h3>
          </div>
          <div className="border px-6 shadow-lg">
            <h3 className="text-[15px] font-bold text-yellow-500 pt-4">⭐ Bestseller</h3>
            {menuItems.map((item) => (
              <div className="flex justify-between border-b border-gray-300 mb-6 items-center" key={item?.id}>
                <div className="w-[65%] md:w-[75%]">
                  <h3 className="text-md font-bold text-gray-800">{item?.name}</h3>
                  <p className="text-[15px] font-semibold text-gray-600">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                      <span className="text-orange-500 font-light text-[10px] bg-orange-200 m-1">| 50% OFF | USE TRYNEW</span>
                  </p>
                  <p className="py-3 text-gray-400 text-sm">{item?.description}</p>
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
                    {/* <button className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"> ADD +</button> */}
                      {cart.some((p) => p.id === item.id) ? (
                        <button
                          onClick={() => removeFromCart(item?.id)}
                          className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
                          >
                          ADD +
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;