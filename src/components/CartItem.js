import React from "react";
import {ITEM_IMG_CDN_URL} from "../constants";
import { remove } from '../redux/CartSlice';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

const CartItem = ({ item , index}) => {

   const dispatch = useDispatch();

    const removeFromCart = (itemId) => {
        dispatch(remove(itemId));
        toast.error("Item removed from Cart");
    }

  return (
    <div className="px-2 md:px-44">
      <div
        className="flex justify-between border-b border-gray-300 mb-6 items-center"
        key={item?.id}
      >
        <div className="w-[60%] md:w-[75%]">
          <h3 className="text-md font-bold text-gray-800">{item?.name}</h3>
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
            {/* <button className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"> ADD +</button> */}
            {/* {cart.some((p) => p.id === item.id) ? ( */}
              <button
                onClick={() => removeFromCart(item?.id)}
                className="border text-green-700 shadow-lg rounded-md font-semibold text-[15px] px-4 py-2 bg-white"
              >
                Remove
              </button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
