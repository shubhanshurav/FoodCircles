import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addRestaurantMenu } from "../redux/slices/RestaurantSlice";

const MENU_API = process.env.REACT_APP_MENU_API;
const MENU_ITEM_TYPE_KEY = process.env.REACT_APP_MENU_ITEM_TYPE_KEY;

const useRestaurantMenu = (resId) => {
  const [menuItems, setMenuItems] = useState([]);
  // Ftech data from API and update store
  const dispatch = useDispatch();

  const restaurantMenu = useSelector(
    (store) => store.restaurants?.restaurantMenu
  );

  useEffect(() => {
    // Always fetch if restaurantMenu does not exist
    if (!restaurantMenu) {
      getMenuItems();
    } else {
      setMenuItems(restaurantMenu); // Use Redux store if data exists
    }
  }, [resId, restaurantMenu]);

  const getMenuItems = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();

      const menuItemsData =
        json?.data?.cards
          ?.find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] === MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          ?.map((x) => x.card?.info) || [];

      // Ensure unique items
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });

      setMenuItems(uniqueMenuItems);
      // Dispatch to store the fetched menu items in Redux store
      dispatch(addRestaurantMenu(uniqueMenuItems));
    } catch (error) {
      toast.error("Error fetching menu items.");
      setMenuItems([]);
      console.error("Error fetching menu items:", error);
    }
  };

  return menuItems;
};

export default useRestaurantMenu;
