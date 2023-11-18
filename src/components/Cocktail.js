import React, { useEffect, useState } from 'react'
import CocktailCard from './CocktailCard';

const Cocktail = () => {

  const [foodData,setFoodData] = useState([]);

  useEffect(() =>{
     getData();
  }, []);

  async function getData() {
    try{
     const data = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
     const json = await data.json();
    //  console.log(json.drinks);
     setFoodData(json.drinks);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <div className=''>
          <div className='text-center text-4xl font-semibold py-6'>
            <h1 className='text-red-500 border-b-4 border-red-500 w-fit m-auto py-2'>Cocktail</h1>
          </div>
          <div className='md:grid md:grid-cols-4 flex flex-wrap m-auto gap-4 px-8'>
          {
            foodData.map((data) => (
              <CocktailCard key={data.idDrink} data={data} />
            ))
          }
          </div>
    </div>
  )
}

export default Cocktail;