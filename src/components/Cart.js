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
                <div>
                    {cart.map((item,index) => (
                        <CartItem key = {item.id} item = {item} index={index}/>
                    ))}
                </div>
                <div>
                    <div className="text-center py-4 md:py-6">
                      <p className="font-bold text-2xl text-gray-600">Total Items :<span className="text-blue-700 px-2">{cart.length}</span></p>
                      <p className="font-bold text-2xl text-gray-600">Total Amount : <span className="text-blue-700">₹{totalAmount}</span></p>
                    </div>
                    <div className="py-2 md:py-12 text-center">
                      <Link to="/checkout">
                        <button className='bg-blue-700 border-2 border-blue-700 rounded-2xl font-semibold text-sm text-white w-[30%] p-2 mt-5 hover:bg-blue-800'>
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
                    className='bg-blue-700 border-2 border-blue-700 rounded-lg text-md text-white py-2 px-2 font-chakra-petch font-extralight hover:bg-blue-800'>
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