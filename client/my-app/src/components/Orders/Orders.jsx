import React, { useState, useEffect } from 'react';
import {FaUsersLine} from 'react-icons/fa6';
import {LuListFilter} from 'react-icons/lu';
import {AiOutlineUserAdd} from 'react-icons/ai';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState(null); // Initialize as null

  const fetchOrderData = async () => {
    try {
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
      setOrders(orderData);
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-scroll overflow-x-auto" style={{ width: "100%" }}>
      <div className="flex justify-center p-3 bg-white py-8">
        <FaUsersLine className='m-1 text-4xl' />
        <h1 className='text-4xl font-bold'>Orders</h1>
      </div>

      <div className="flex justify-between p-3 bg-white">
        <button className="px-4 py-2 flex text-base text-white bg-gray-500 rounded-lg hover-text-white focus:outline-none">
          <LuListFilter className="w-4 h-6 mr-1" />
          Filter
        </button>

        <button className="px-4 py-2 flex text-base text-white bg-lightgreen rounded-lg hover:bg-green-300 focus:outline-none">
          <AiOutlineUserAdd className="w-6 h-6 mr-1" />
          Add Order
        </button>
      </div>

      <div className="h-80 overflow-auto">
        {orders === null ? (
          <p>Loading...</p>
        ) : (
          <table className="table-auto w-full">
            <thead className='sticky top-0'>
              <tr>
                <th className="text-center py-3 bg-gray-100  text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  First Name
                </th>
                <th className="text-center py-3 bg-gray-100  text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="text-center py-3 bg-gray-100  text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Order date
                </th>
                <th className="text-center py-3 bg-gray-100  text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Cart total price
                </th>
                <th className="text-center py-3 bg-gray-100  text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="overflow-auto bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">{order.customer_id ? order.customer_id.first_name: 'N/A'}</td>
                  <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">{order.customer_id ? order.customer_id.last_name : 'N/A'}</td>
                  <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-blue-500">
                    {new Date(order.order_date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="text-center py-4 whitespace-no-wrap text-sm leading-5">{order.cart_total_price ? order.cart_total_price.$numberDecimal : 'N/A'}</td>
                  <td className="text-center py-4 whitespace-no-wrap text-sm leading-5">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
