import React, { useState, useEffect, Fragment } from 'react';
import {FaUsersLine} from 'react-icons/fa6';
import {LuListFilter} from 'react-icons/lu';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {Transition, Menu } from '@headlessui/react';
import classNames from 'classnames';
import {RiMoreLine} from 'react-icons/ri';
import {AiOutlineArrowUp} from 'react-icons/ai';
import { getOrderStatus } from '../../lib/consts/utils'
import axios from 'axios';
import Lottie from 'react-lottie'
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
    }, 2000);
    };

    fetchData();
  }, []);

  return (
   
    <div>
      <div>
      <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-3 bg-white">
        <h1 className="px-4 py-2 flex text-xl rounded-lg  focus:outline-none">
          Orders
        </h1>
      </div>
      </div>


      <div className="table-container shadow-lg h-full overflow-x-auto">
        {loading === true ? (
          <Lottie options={defaultOptions} height={200} width={200} />
        ) : (
          <table className="table-auto w-full">
            <thead className='border-y-2'>
              <tr>
                <th className="group px-5 ease-in bg-white hover:bg-gray-200 active:bg-gray-300 text-xs  sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex w-full group h-full">
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
                  <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700 ">
                  
                    
                    {/* <Menu as="div" className="relative px-4">
        <div>
          <Menu.Button className="ml-2 mt-2 rounded-full focus:outline-none text-neutral-400 hover:ring-2 hover:ring-neutral-500">
            
              <RiMoreLine className='w-9 h-9 text-neutral-400'/>
             
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => {
                    setOpenDetail(true);
                    setSelectedUser(user); }}  >
                  <TbListDetails className='flex mt-1 w-6 h-6  p-1 '/>
                  details
                </div>
                
                
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => navigate(`/users/edit/${user._id}`)} >
                  <FiEdit className='flex mt-1 w-6 h-6  p-1 '/>
                  Edit
                </div>
                
                
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => {
                    setOpenModal(true);
                    setSelectedUser(user); }} >
                  <FiDelete className='flex mt-1 w-6 h-6  p-1 '/>
                  Delete
                </div>
                
                
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu> */}
           
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
