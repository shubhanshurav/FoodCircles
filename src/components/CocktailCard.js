import React from 'react'

const CocktailCard = ({data}) => {
  return (
    <div className='m-auto'>
      <div className="w-78 border shadow-lg py-4 px-4">
        <div>
          <img src={data.strDrinkThumb} alt="foodimg" className="rounded-lg" />
        </div>
        <div className="px-4 py-4">
          <h1 className='text-xl text-red-600 font-bold'>{data.strCategory}</h1>
          <h1 className='text-xl text-red-600 font-bold'>{data.strDrink}</h1>
        </div>
      </div>
    </div>
  )
}

export default CocktailCard;