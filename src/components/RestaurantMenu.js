import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import {MenuShimmer} from "./Shimmer";
import {MENU_API, ITEM_IMG_CDN_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY} from "../constants";

const RestaurantMenu = () => {
  const { resId } = useParams(); // find resId from url using useParams hook
  const [restaurant, setRestaurant] = useState(null); // store the api data in restaurant
  const [menuItems, setMenuItems] = useState([]);
  console.log(resId);

  useEffect(() => {
    getRestaurantInfo(); 
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();
      
      // Set restaurant data
      const restaurantData = json?.data?.cards?.map(x => x.card)?.find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      setRestaurant(restaurantData);
      console.log(restaurantData);

      // Set menu item data
      const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(x => x.card?.card)?.filter(x=> x['@type'] === MENU_ITEM_TYPE_KEY)?.map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
      
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="px-2 md:px-44">
      <div className="border-b py-4" >
        {/* <img
          className=""
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        /> */}
        <div className="flex justify-between pt-8 border-b py-5">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{restaurant?.name}</h2>
            <p className="text-sm font-thin text-gray-500">{restaurant?.cuisines?.join(", ")}</p>
            <p className="text-sm font-thin text-gray-500">{restaurant?.areaName} , {restaurant?.city}  | {restaurant?.sla?.lastMileTravelString}</p>
          </div>
          <div>
            <p className="text-md border p-1 text-center"><span className="rounded-full text-[12px] bg-green-600 m-1" >⭐</span>{restaurant?.avgRating}</p>
            <p className="text-sm border p-1 text-center text-gray-700">{restaurant?.totalRatingsString}</p>
          </div>
        </div>
        <div className="flex font-bold py-2" >
            <p className="text-gray-700">⌚ {restaurant?.sla?.slaString} </p>
            <p className="text-gray-700 px-20">®️ {restaurant?.costForTwoMessage}</p>
        </div>
      </div>

      <div>
        <div className="px-4">
          <div className="py-4">
            <h3 className="font-extrabold text-gray-800 text-xl" >Recommended({menuItems.length})</h3>
          </div>
          <div className="">
            <h3 className="text-[15px] font-bold text-yellow-500 pt-4">⭐ Bestseller</h3>
            {menuItems.map((item) => (
              <div className="flex justify-between border-b border-gray-300 mb-6 items-center" key={item?.id}>
                <div className="w-[60%] md:w-[75%]">
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
                <div className="m-auto text-center py-4">
                  {item?.imageId && (
                    <img
                      className="w-36 h-24 rounded-2xl"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <div className="-mt-5">
                    <button className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"> ADD +</button>
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