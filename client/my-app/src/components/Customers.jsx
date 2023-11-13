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
import AddUser from './Users/AddUser';
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom'
import UserDetails from './Users/UserDetails';

export default function Customers() {
  
const token = localStorage.getItem('accessToken');
const [customers, setCostumers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [openDetail, setOpenDetail] = useState(false);

const fetchUserData = async (page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}`}
    }
    const response = await axios.get(`http://localhost:3001/customers`, config);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};


const handleDeleteUser = async () => {
  console.log(selectedUser);
  if (selectedUser) {
    try {
      const user_id = selectedUser._id;
      await axios.delete(`http://localhost:3001/customers/${user_id}`);
      console.log(selectedUser);
      
      setCostumers((prevUsers) =>
        prevUsers.filter((user) => user._id !== user_id)
      );
      setSelectedUser(null);
      setOpenModal(false);
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  }
};

useEffect(() => {
  const fetchData = async () => {
    const userData = await fetchUserData();
    setCostumers(userData);
  };

  fetchData();
}, []);
     
     const navigate = useNavigate()
return (
  <div className='max-w-full '>
  <div>
    
    <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-3 bg-white">
      
      <button className="px-2 py-2 sm:px-4 sm:py-2 flex text-sm text-gray-400 bg-white rounded-lg hover-text-white focus:outline-none">
        <LuListFilter className="w-4 h-6 mr-1" />
        Filter
      </button>
      
      {/* <Link to="/users/adduser" style={{ textDecoration: 'none' }}> */}
        <div className="px-2 py-1 sm:px-4  sm:py-2 flex font-semibold text-white bg-cyan-500 hover:bg-sky-800 focus:ring focus:ring-blue-300 rounded-lg focus:outline-none"
        
        >
          6 Customers
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
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className=" px-10 py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {customer.active ? (
                    <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100" >ACTIVE</span>
                  ) : (
                    <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">INACTIVE</span>
                  )}
                </td>
                <td className=" p-5  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{customer.first_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{customer.last_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{customer.email}</td>
                
                <td className=" py-2 text-center whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {new Date(customer.creation_date).toLocaleDateString('en-GB')}
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
                    setSelectedUser(customer); }}  >
                  <TbListDetails className='flex mt-1 w-6 h-6  p-1 '/>
                  details
                </div>
                
                
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => navigate(`/users/edit/${customer._id}`)} >
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
                    setSelectedUser(customer); }} >
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
      {openModal && (
  
  <PopUp  Title="Delete User"> 
      <DeleteUser setOpenModal={setOpenModal} handleDeleteUser={handleDeleteUser}/>
  </PopUp>
      )} 
     
   {openDetail && (
  <PopUp >
    <UserDetails  setOpenDetail={setOpenDetail} selectedUser={selectedUser} setSelectedUser={setSelectedUser}  />
  </PopUp>
  )}
    
    </div>
    
)
}
    