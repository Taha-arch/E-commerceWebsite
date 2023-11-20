import React, { useState, useEffect, Fragment }  from 'react';
import {FiEdit,FiDelete} from 'react-icons/fi';
import {TbListDetails} from 'react-icons/tb';
import {LuListFilter} from 'react-icons/lu';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {RiMoreLine} from 'react-icons/ri';
import {Transition, Menu } from '@headlessui/react';
import classNames from 'classnames' 
import axios from 'axios'; 
import DeleteUser from './DeleteUser';
import AddUser from './AddUser';
import PopUp from '../PopUp';
import { useNavigate } from 'react-router-dom'
import UserDetails from './UserDetails';
import Lottie from 'react-lottie'
import swal from 'sweetalert'

import { useDispatch } from 'react-redux';
import { fetchData } from '../../redux/slicers/userSlice';
import { useSelector } from 'react-redux';
import * as animation from "../../assets/animations/Animation - 1699995980899.json"




const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  }}


export default function Users() {
  
// const token = localStorage.getItem('accessToken');
// const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [openDetail, setOpenDetail] = useState(false);
const [addUser, setAddUser] = useState(false);


// const fetchUserData = async (page) => {
//   try {
//     const config = {
//       headers: { Authorization: `Bearer ${token}`}
//     }
//     const response = await axios.get(`http://localhost:3001/users?page=${page}`, config);
    
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return [];
//   }
// };

const notify = () => swal(
  {
    title: 'User deleted successfully',
    icon: 'success',
    button: 'close',
    className: 'alert',
  }
);

// const handleDeleteUser = async () => {
//   if (selectedUser) {
//     try {
//       const user_id = selectedUser._id;
//       await axios.delete(`http://localhost:3001/users/${user_id}`).then(
//         notify,
        
//     );;
  
//       setUsers((prevUsers) =>
//         prevUsers.filter((user) => user._id !== user_id)
//       );
//       setSelectedUser(null);
//       setOpenModal(false);
//     } catch (error) {
//       console.error('Error deleting user data:', error);
//     }
//   }
// };

const users = useSelector((state) => state.user);
const loadingstate = useSelector((state) => state.loading);
const dispatch = useDispatch();
useEffect(() => {
<<<<<<< HEAD
  const fetchData = async () => {
    const userData = await fetchUserData();
    setUsers(userData);
  };

  fetchData();
});
=======
  
  dispatch(fetchData(1));
}, [dispatch]);
>>>>>>> 39e7ad7467c41d87e7924d9c7b708d9a7e00d5ff
     
  console.log(users);


     const navigate = useNavigate()
return (
  <div>
  <div>
    
    <div className="flex shadow-lg rounded-t-3xl flex-row sm:flex-row justify-between p-3 bg-white">
      
        <h1 className="px-4 py-2 flex text-xl rounded-lg  focus:outline-none">
          Users
        </h1>
      
      {/* <Link to="/users/adduser" style={{ textDecoration: 'none' }}> */}
        <button className="px-2 py-1 sm:px-4  sm:py-2 flex font-semibold text-white bg-cyan-500 hover:bg-sky-800 focus:ring focus:ring-blue-300 rounded-lg focus:outline-none"
        onClick={() => {setAddUser(true)}}
        >
          <IoIosAddCircleOutline className="w-6 h-6 mr-1" />
          
          Add User
        </button>
      {/* </Link> */}
    </div>
  </div> 

              <div className="table-container shadow-lg max-w-full overscroll-contain  ">
              {loadingstate === true ? (
          <Lottie options={defaultOptions} height={200} width={200} />
        ) : (
      <table className="flex table w-full ">
        <thead className='border-y-2 '>
          <tr>
          <th className="text-center py-3 bg-white text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
            <th className="group px-5 ease-in bg-white hover:bg-gray-200 active:bg-gray-300 text-xs  sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              
              <div className="flex  group  w-full h-full">
                First Name
                <p className="invisible group-hover:visible "><AiOutlineArrowUp className=" inline pb-1 pl-1 w-5 h-5" /></p>
              </div>
            </th>
            <th className=" bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Last Name
            </th>
            <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              User Name
            </th>
            <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className=" text-center bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th className=" text-center bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Creation Date
            </th>
            <th className=" text-center py-2 bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              
            </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.user.map((item) => (
              <tr key={item._id} className='relative bt-3 hover:bg-gray-200 transition-colors'>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">
                  <img alt="" className='rounded-full h-20 w-20 ' src={item.userImage}></img>
                </td>
                <td className=" p-5  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.first_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.last_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.user_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{item.email}</td>
                <td className=" py-2 text-center whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {item.active ? (
                    <span className="capitalize py-1 px-2 rounded-md text-md text-emerald-600 bg-emerald-100" >{item.role}</span>
                  ) : (
                    <span className="capitalize py-1 px-2 rounded-md text-md text-red-600 bg-red-100">{item.role}</span>
                  )}
                  
                </td>
                <td className=" py-2 text-center whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {new Date(item.creation_date).toLocaleDateString('en-GB')}
                </td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700 ">
                  
                    
                    <Menu as="div" className=" relative px-4">
        <div>
          <Menu.Button className="ml-2 mt-2 rounded-full focus:outline-none   ">
            
              <RiMoreLine className='w-10 h-10 text-neutral-400 hover:text-cyan-700'/>
             
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
                    setSelectedUser(item); }}  >
                  <TbListDetails className='flex mt-1 w-6 h-6  p-1 '/>
                  details
                </div>
                
                
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => navigate(`/users/edit/${item._id}`)} >
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
                    setSelectedUser(item); }} >
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
        )}
        <div className='flex  justify-end  flex-col md:flex-row   w-full '>
       
        </div>
      </div>
      {/* {openModal && (
  
  <PopUp  Title="Delete User"> 
      <DeleteUser setOpenModal={setOpenModal} handleDeleteUser={handleDeleteUser}/>
  </PopUp>
      )}  */}
     {addUser && (
  
  <PopUp  > 
      <AddUser setAddUser={setAddUser}/>
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
    
    