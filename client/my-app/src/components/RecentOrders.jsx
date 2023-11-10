import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/consts/utils'


function RecentOrders() {
  const [orders, setOrders] = useState([]);


const fetchOrderData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/orders' , { 
      params: {
      _limit: 4
     }
    });
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
    <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
    <strong className='text-gray-700 font-medium'>Recent Orders</strong>
    <div className='mt-3'>
     <table className='w-full text-gray-700'>
      <thead>
        <tr>
          <td>ID</td>
          <td>Customer Name</td>
          <td>Order Date</td>
          <td>Shipping Address</td>
          <td>Shipping Status</td>
        </tr>
      </thead>
      <tbody>
      {orders.map(order => 
      <tr key={order._id}>
        <td>
          <Link to={`/order/${order._id}`}>#{order._id}</Link>
          </td>
        <td>
             <Link to={`/customer/${order.customer_id ? order.customer_id._id : ''}`}>    {order.customer_id
                    ? `${order.customer_id.first_name} ${order.customer_id.last_name}`
                    : 'N/A'}</Link> 
                </td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>${parseFloat(order.cart_total_price?.$numberDecimal).toFixed(2)}</td>
                <td>{getOrderStatus(order.status)}</td>
      </tr>
      )}
      </tbody>
     </table>
    </div>
  </div>
  )
}


export default RecentOrders
