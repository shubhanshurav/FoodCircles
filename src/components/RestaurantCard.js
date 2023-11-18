import React from 'react';
import { IMG_CDN_URL } from '../constants';

const RestaurantCard = ({
  cloudinaryImageId,
  aggregatedDiscountInfoV3,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRatingString,
}) => {

  const discount = aggregatedDiscountInfoV3?.header + " " + aggregatedDiscountInfoV3?.subHeader;
  const cuisine = cuisines.join(", ")

  return (
    <div className='m-auto w-fit sm:w-44 md:w-56 hover:scale-95 hover:ease-in hover:duration-200 items-center shadow-lg px-2 py-2'>
      <div className='relative'>
        <img 
          src={IMG_CDN_URL + cloudinaryImageId} 
          alt='FoodImg'
          className='w-full h-auto rounded-2xl'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70 rounded-2xl"></div>

        <div className="absolute bottom-2 font-extrabold text-xl text-white flex items-center justify-center">
          <h1 className="px-2">{discount.split(" ").slice(0,3).join(" ")}...</h1>
        </div>
      </div>

      <div className="px-2">
        <h3 className='font-semibold py-1 text-lg text-gray-600'>{name.split(" ").slice(0,3).join(" ")}...</h3>
        <h5 className='font-light'>{cuisine.split(" ").slice(0,3).join(" ")}...</h5>
        <h5 className=''>{areaName}</h5>
        <div className="flex items-center gap-1">
          <h4 className='font-bold items-center'>
            <span className="rounded-full bg-green-600 text-[12px] p-[1px]">⭐</span>{avgRatingString} 
          </h4>
          <h4 className=""> <span>•</span>
            {sla?.slaString}
          </h4>
          <h4 className=''> <span>•</span>
            {sla?.lastMileTravelString}
          </h4>
          {/* <h4>•</h4> */}
        </div>
        <div>
          <h4 className='py-1 text-semibold'>{costForTwo ?? '₹200 for two'}</h4>
        </div>
      </div>

    </div>
  )
}

export default RestaurantCard;