import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addRestaurantData } from "../redux/slices/RestaurantSlice";

const MENU_API = process.env.REACT_APP_MENU_API;
const RESTAURANT_TYPE_KEY = process.env.REACT_APP_RESTAURANT_TYPE_KEY;

const useRestaurant = (resId) => {
  const [restaurant, setRestaurant] = useState(null);

  // Ftech data from API and update store
  const dispatch = useDispatch();

  const restaurantData = useSelector(
    (store) => store.restaurants?.addRestaurantData
  );

  useEffect(() => {
    if (!restaurantData) {
      getRestaurantInfo();
    }
  }, [resId, restaurantData]);

  const getRestaurantInfo = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();

      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;

      setRestaurant(restaurantData);
      // Dispatch to store the fetched menu items in Redux store
      dispatch(addRestaurantData(restaurantData));
    } catch (error) {
      toast.error("Error fetching restaurant details.");
      setRestaurant(null);
      console.error("Error fetching restaurant info:", error);
    }
  };

  return restaurant;
};

export default useRestaurant;
