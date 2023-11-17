import React, { useState, useEffect, Fragment } from 'react';
import { FaRegEdit } from 'react-icons/fa'
import {AiOutlineArrowUp} from 'react-icons/ai';
import { getOrderStatus } from '../../lib/consts/utils'
import axios from 'axios';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import * as animation from "../../assets/animations/Animation - 1699995980899.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  }}

export default function Orders() {
  const [orders, setOrders] = useState([]); // Initialize as null
  const [loading, setLoading] = useState(false);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/orders');
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching order data:', error);
      return [];
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const orderData = await fetchOrderData();
      setTimeout(() => {
      setOrders(orderData);
      setLoading(false);
    }, 0);
    };

    fetchData();
  }, []);
  const navigate = useNavigate()
  return (
   
    <div>
      <div>
      <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-3 bg-white">
        <h1 className="px-4 py-2 flex text-xl rounded-lg  focus:outline-none">
          Orders
        </h1>
      </div>
      </div>


      <div className="table-container shadow-lg max-w-full overflow-x-auto">
        {loading === true ? (
          <Lottie options={defaultOptions} height={200} width={200} />
        ) : (
          <table className="table-auto w-full">
            <thead className='border-y-2'>
              <tr>
                <th className="group px-5 ease-in bg-white hover:bg-gray-200 active:bg-gray-300 text-xs  sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex w-full group  w-full h-full">
                  First Name
                  <p className="invisible group-hover:visible "><AiOutlineArrowUp className=" inline pb-1 pl-1 w-5 h-5" /></p>
                  </div>
                </th>
                <th className=" bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Order date
                </th>
                <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Cart total price
                </th>
                <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className=" text-center py-2 bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Edit Order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className='bt-3 hover:bg-gray-100 transition-colors'>
                  <td className=" p-5  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{order.customer_id ? order.customer_id.first_name: 'N/A'}</td>
                  <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{order.customer_id ? order.customer_id.last_name : 'N/A'}</td>
                  <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                    {new Date(order.order_date).toLocaleDateString('en-GB')}
                  </td>
                  <td className=" pl-16 whitespace-no-wrap text-xs sm:text-sm text-gray-700">{order.cart_total_price ? order.cart_total_price.$numberDecimal : 'N/A'}</td>
                  <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{getOrderStatus(order.status)}</td>
                  <td className=" py-4 flex justify-center whitespace-no-wrap text-xs sm:text-sm text-gray-700 ">
                  
                  <FaRegEdit className='w-5 h-5 cursor-pointer hover:text-cyan-700' onClick={() => navigate(`/orders/edit/${order._id}`)} />
                  
           
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
