import React from 'react';
import { useNavigate } from 'react-router-dom';



const OrderSummary = () => {
  const navigate = useNavigate();
 return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <p>Subtotal</p>
        <p>$2,270</p>
      </div>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <p>Shipping Tax</p>
        <p>$2,270</p>
      </div>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4 font-semibold">
        <p>Total</p>
        <p>$2,270</p>
      </div>
      <button className="bg-truegreen hover:bg-truegreentint text-white font-bold w-full py-2 px-4 rounded mb-2" onClick={() => navigate('/checkout')}>Checkout</button>
      <button className="bg-white hover:bg-gray-300 border text-sm w-full font-bold py-2 px-4 rounded">Continue Shopping</button>
    </div>
 );
};

export default OrderSummary;