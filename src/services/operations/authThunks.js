// redux/thunks/authThunks.js
import toast from "react-hot-toast";
import { setToken } from "../../redux/slices/authSlice";
import { setLoading, setUser } from "../../redux/slices/profileSlice";
import { fetchCartThunk } from "../../redux/thunks/cartThunks";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
  LOGIN_API,
} = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      // Fetch cart after login
      dispatch(fetchCartThunk(response.data.user._id));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/restaurant");
    } catch (error) {
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
