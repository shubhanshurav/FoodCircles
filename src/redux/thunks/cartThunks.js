// redux/thunks/cartThunks.js
import { apiConnector } from "../../services/apiConnector";
import { add, remove, setCart } from "../../redux/slices/CartSlice";

const API_BASE_URL = "http://localhost:5000/api/v1/cart";

export function addToCartThunk(userId, menuItem, quantity) {
console.log("menuItem1", menuItem);

  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", `${API_BASE_URL}/add`, {
        userId,
        menuItem,
        quantity,
      });
      
// console.log("menuItem  ===",response)

      if (response.data.success) {
        dispatch(add({ userId, menuItem, quantity }));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
}

export function removeFromCartThunk(userId, menuItem) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", `${API_BASE_URL}/remove`, {
        userId,
        menuItem,
      });

      if (response.data.success) {
        dispatch(remove({ menuItem }));
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };
}

export function fetchCartThunk(userId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", `${API_BASE_URL}/${userId}`);

      if (response.data.success) {
        dispatch(setCart(response.data.cart));
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };
}
