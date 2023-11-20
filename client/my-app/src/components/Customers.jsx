import React, { useState, useEffect, Fragment }  from 'react';
import {FiEdit,FiDelete} from 'react-icons/fi';
import {TbListDetails} from 'react-icons/tb';
import {LuListFilter} from 'react-icons/lu';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {RiMoreLine} from 'react-icons/ri';
import {Transition, Menu } from '@headlessui/react'
import classNames from 'classnames' 
import axios from 'axios'; 
import DeleteUser from './Users/DeleteUser';
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom'
import CustomerDetails from './CustomerDetails';
import  { useDispatch, useSelector } from 'react-redux'
import  { fetchCustomers } from '../redux/slicers/customers/customerSlice'

export default function Customers() {
  
const token = localStorage.getItem('accessToken');
// const [customers, setCostumers] = useState([]);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [openDetail, setOpenDetail] = useState(false);


const customers = useSelector(state => state.customer)
console.log(customers);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchCustomers());
}, [dispatch]);

  


// const fetchUserData = async (page) => {
//   try {
//     const config = {
//       headers: { Authorization: `Bearer ${token}`}
//     }
//     const response = await axios.get(`http://localhost:3001/customers`, config);
    
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return [];
//   }
// };


// const handleDeleteUser = async () => {
//   console.log(selectedCustomer);
//   if (selectedCustomer) {
//     try {
//       const user_id = selectedCustomer._id;
//       await axios.delete(`http://localhost:3001/customers/${user_id}`);
//       console.log(selectedCustomer);
      
//       setCostumers((prevUsers) =>
//         prevUsers.filter((user) => user._id !== user_id)
//       );
//       setSelectedCustomer(null);
//       setOpenModal(false);
//     } catch (error) {
//       console.error('Error deleting user data:', error);
//     }
//   }
// };


     
     const navigate = useNavigate()
return (
<div>
  <div className='max-w-full '>
    
  <div>
    
    <div className="flex shadow-lg rounded-t-3xl flex-row sm:flex-row justify-between p-3 bg-white">
      
        <h1 className="px-4 py-2 flex text-xl rounded-lg  focus:outline-none">
          Customers
        </h1>
        <div className="px-2 py-2 sm:px-4  sm:py-3 flex font-semibold text-white bg-cyan-500 hover:bg-sky-800 focus:ring focus:ring-blue-300 rounded-lg focus:outline-none"
        
        >
         {customers.customer.length}  Customers
        </div>
      {/* </Link> */}
    </div>
  </div> 

              <div className="table-container shadow-lg max-w-full overflow-x-auto ">
      <table className="flex table w-full ">
        <thead className='border-y-2 '>
          <tr >
           <th className='px-10 bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
            <th className=" px-5 bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider ">
              First Name
            </th>
            <th className=" bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Last Name
            </th>
            <th className="w-20  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className=" text-center bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Creation Date
            </th>
            <th className=" text-center py-2 bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              
            </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.customer.map((item) => (
              <tr key={item._id}>
                <td className=" px-10 py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {item.active ? (
                    <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100" >ACTIVE</span>
                  ) : (
                    <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">INACTIVE</span>
                  )}
                </td>
                <td className=" p-5  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.first_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.last_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.email}</td>
                
                <td className=" py-2 text-center whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {new Date(item.creation_date).toLocaleDateString('en-GB')}
                </td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700 ">
                  
                    
                    <Menu as="div" className="relative px-4">
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
                    setSelectedCustomer(item); }}  >
                  <TbListDetails className='flex mt-1 w-6 h-6  p-1 '/>
                  details
                </div>
                
                
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => navigate(`/customers/edit/${item._id}`)} >
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
                    setSelectedCustomer(item); }} >
                  <FiDelete className='flex mt-1 w-6 h-6  p-1 '/>
                  Delete
                </div>
                
                
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
           
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex  justify-end  flex-col md:flex-row   w-full '>
       
        </div>
      </div>
      {/* {openModal && (
  
  <PopUp  Title="Delete User"> 
      <DeleteUser setOpenModal={setOpenModal} handleDeleteUser={handleDeleteUser}/>
  </PopUp>
      )} 
     
   {openDetail && (
  <PopUp >
    <CustomerDetails  setOpenDetail={setOpenDetail} selectedUser={selectedCustomer} setSelectedUser={setSelectedCustomer}  />
  </PopUp>
  )} */}
    
    </div>
    </div>
)
}
    