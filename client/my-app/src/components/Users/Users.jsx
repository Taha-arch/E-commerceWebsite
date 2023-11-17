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
import swal from 'sweetalert'
import  { useDispatch, useSelector } from 'react-redux'
import  { fetchUsers } from '../../redux/slicers/userSlice'

export default function Users() {
  
const token = localStorage.getItem('accessToken');
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [openDetail, setOpenDetail] = useState(false);
const [addUser, setAddUser] = useState(false);

const user = useSelector(state => state.user)
const dispatch = useDispatch()
useEffect(() => {
  dispatch(fetchUsers())
}, []);
console.log(user.users);




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

const handleDeleteUser = async () => {
  if (selectedUser) {
    try {
      const user_id = selectedUser._id;
      await axios.delete(`http://localhost:3001/users/${user_id}`).then(
        notify,
        
    );;
  
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== user_id)
      );
      setSelectedUser(null);
      setOpenModal(false);
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  }
};

// useEffect(() => {
//   const fetchData = async () => {
//     const userData = await fetchUserData();
//     setUsers(userData);
//   };

//   fetchData();
// }, []);
     
     const navigate = useNavigate()
return (
  <div>
    {user.loading && <div>Loading...</div>}
    {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
    {!user.loading && user.users.length ? 
  <div>
  <div>
    
    <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-3 bg-white">
      
      <button className="px-2 py-2 sm:px-4 sm:py-2 flex text-sm text-gray-400 bg-white rounded-lg hover-text-white focus:outline-none">
        <LuListFilter className="w-4 h-6 mr-1" />
        Filter
      </button>
      
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

              <div className="table-container shadow-lg max-w-full overflow-x-auto ">
      <table className="flex table w-full ">
        <thead className='border-y-2 '>
          <tr>
          <th className="text-center py-3 bg-white text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
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
              User Name
            </th>
            <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="  bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
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
            {user.users.map((user) => (
              <tr key={user._id} className='bt-3 hover:bg-gray-200 transition-colors'>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">
                  <img alt="" className='rounded-full h-20 w-20 ' src={user.userImage}></img>
                </td>
                <td className=" p-5  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.first_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.last_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.user_name}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.email}</td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {user.active ? (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-lightgreen" />
                  ) : (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-red-500" />
                  )}
                  {user.role}
                </td>
                <td className=" py-2 text-center whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {new Date(user.creation_date).toLocaleDateString('en-GB')}
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
    
    </div>  : null}
    </div>
    
)
}
    
    