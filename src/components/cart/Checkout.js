import React from 'react';
import {Link} from "react-router-dom";

const Checkout = () => {
  return (
    <div>
       <div className='text-center items-center my-52'> 
                <h1 className='font-semibold text-3xl font-chakra-petch m-7'>Checkout page abhi bana nahi hai wait karo...</h1>
                <Link to="/">
                    <button 
                    className='bg-blue-700 border-2 border-blue-700 rounded-lg text-md text-white py-2 px-2 font-chakra-petch font-extralight hover:bg-blue-800'>
                    Order Now
                    </button>
                </Link>
        </div>
    </div>
  )
}

export default Checkout;