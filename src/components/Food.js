import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard';

const Food = () => {

  const [foodData,setFoodData] = useState([]);

  useEffect(() =>{
     getData();
  }, []);

  async function getData() {
    try{
     const data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
     const json = await data.json();
    //  console.log(json.categories);
     setFoodData(json.categories);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <div className=''>
          {/* <div className='text-center text-4xl font-semibold py-6'>
            <h1 className='text-red-500 border-b-4 border-red-500 w-fit m-auto py-2'>Food App</h1>
          </div> */}
          <div className='md:grid md:grid-cols-4 flex flex-wrap m-auto gap-4 px-8'>
          {
            foodData.map((data) => (
              <FoodCard key={data.idCategory} data={data} />
            ))
          }
          </div>
    </div>
  )
}

export default Food;