import React from 'react';

const FoodCard = ({data}) => {

  return (
    <div className='w-fit sm:w-44 md:w-56  hover:scale-95 hover:ease-in hover:duration-200 items-center shadow-lg'>
      <div className="border px-2 py-2">
        <div className="">
          <img 
            src={data.strCategoryThumb} 
            alt="foodimg" 
            className='w-full h-auto rounded-md md:rounded-2xl'
          />
        </div>
        <div className="px-2 py-1">
          <h1 className='text-[16px] md:text-xl text-red-600 font-bold'>{data.strCategory}</h1>
          <h1 className='text-[14px]  md:text-md font-light py-1'>{data.strCategoryDescription.split(" ").slice(0,12).join(" ")}.....</h1>
        </div>
      </div>
    </div>
  )
}

export default FoodCard;