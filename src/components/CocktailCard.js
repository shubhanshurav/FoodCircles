import React from 'react'

const CocktailCard = ({data}) => {
  return (
    <div className='w-fit sm:w-44 md:w-56 hover:scale-95 hover:ease-in hover:duration-200 items-center shadow-lg'>
      <div className="border shadow-lg py-2 px-2">
        <div>
          <img 
           src={data.strDrinkThumb} 
          alt="foodimg" 
          className="w-full h-auto rounded-md md:rounded-2xl'" 
          />
        </div>
        <div className="px-4 py-4">
          <h1 className='text-[16px] md:text-xl text-red-600 font-extrabold'>{data.strCategory}</h1>
          <h1 className='text-[13px]  md:text-lg text-red-600 font-semibold'>{data.strDrink}</h1>
        </div>
      </div>
    </div>
  )
}

export default CocktailCard;