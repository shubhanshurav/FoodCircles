import React from 'react';

const FoodCard = ({data}) => {

  return (
    <div className='m-auto'>
      <div className="w-78 border shadow-lg py-4 px-4">
        <div className="">
          <img src={data.strCategoryThumb} alt="foodimg" />
        </div>
        <div className="px-4 py-4">
          <h1 className='text-xl text-red-600 font-bold'>{data.strCategory}</h1>
          <h1 className='text-md font-light py-2'>{data.strCategoryDescription.split(" ").slice(0,12).join(" ")}.....</h1>
        </div>
      </div>
    </div>
  )
}

export default FoodCard;