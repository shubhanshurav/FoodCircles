import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {

  const {cart} = useSelector((state) => state);
  console.log(cart);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
     const cartTotal = cart.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
     const totalRupye = cartTotal/100;

     setTotalAmount((totalRupye).toFixed(2));
  },[cart]);

  return (
    <div>
        <div>
        {
            cart.length > 0 ?(
              <div>
                <div className='shadow-lg'>
                    {cart.map((item,index) => (
                        <CartItem key = {item.id} item = {item} index={index}/>
                    ))}
                </div>
                <div className='shadow-lg pb-8'>
                    <div className="text-center py-4 md:py-6">
                      <p className="font-bold text-2xl text-gray-600">Total Items :<span className="text-yellow-500 px-2">{cart.length}</span></p>
                      <p className="font-bold text-2xl text-gray-600">Total Amount : <span className="text-yellow-500">₹{totalAmount}</span></p>
                    </div>
                    <div className="py-2 md:py-10 text-center">
                      <Link to="/checkout">
                        <button className='bg-yellow-500 border-2 border-yellow-500 rounded-2xl font-bold text-sm text-red-800 w-[65%] md:w-[25%] p-2 mt-5 hover:bg-yellow-600'>
                          Pay Now
                        </button>
                      </Link>
                    </div>
                </div>
              </div>
           ): (
                <div className='text-center items-center my-52'> 
                <h1 className='font-semibold text-3xl font-chakra-petch m-7'>Cart Empty</h1>
                <Link to="/">
                    <button 
                    className='bg-yellow-600 border-2 border-yellow-600 rounded-lg text-md text-white py-2 px-2 font-chakra-petch font-extralight hover:bg-yellow-600'>
                    Shop Now
                    </button>
                </Link>
                </div>
          )
        }
     </div>
    </div>
  )
}

export default Cart