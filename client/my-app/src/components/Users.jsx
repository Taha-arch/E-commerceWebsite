import React, { useState, useEffect } from 'react';
import {FiEdit3} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {BsBoxArrowDownRight} from 'react-icons/bs';
import {LuListFilter} from 'react-icons/lu';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {FaUsersLine} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import DeleteUser from './DeleteUser';
import AddUser from './AddUser';
import PopUp from './PopUp';

export default function Users() {
  
const token = localStorage.getItem('accessToken');
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [addUser, setAddUser] = useState(false);


const fetchUserData = async (number) => {
  try {
        const config = {
          headers: { Authorization: `Bearer ${token}`}
        }
        const response = await axios.get(`http://localhost:3001/users?page=${number}`, config); 
        return response.data.data; 
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
      await axios.delete(`http://localhost:3001/users/${user_id}`);
      console.log(selectedUser);
      
      setUsers((prevProducts) =>
        prevProducts.filter((user) => user._id !== user_id)
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
          setUsers(userData);
        };
      
        fetchData(); 
}, []); 
     const handleSubmit = () => {

     }

return (
  <div>
  <div>
    <div className="flex justify-center p-3 bg-white py-4 sm:py-8">
      
      <h1 className="text-3xl sm:text-4xl font-bold">Users</h1>
    </div>
    <div className="flex flex-row sm:flex-row justify-between p-3 bg-white">
      
      <button className="px-2 py-2 sm:px-4 sm:py-2 flex text-sm text-white bg-gray-500 rounded-lg hover-text-white focus:outline-none">
        <LuListFilter className="w-4 h-6 mr-1" />
        Filter
      </button>
      
      {/* <Link to="/users/adduser" style={{ textDecoration: 'none' }}> */}
        <button className="px-2 py-1 sm:px-4  sm:py-2 flex font-semibold text-white bg-emerald-500 hover:bg-emerald-600 focus:ring focus:ring-blue-300 rounded-lg focus:outline-none"
        onClick={() => {setAddUser(true)}}
        >
          <AiOutlineUserAdd className="w-6 h-6 mr-1" />
          
          Add User
        </button>
      {/* </Link> */}
    </div>
  </div> 

              <div className="table-container max-w-full overflow-x-auto ">
      <table className="flex table ">
        <thead>
          <tr >
            <th className="text-center   bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              First Name
            </th>
            <th className="text-center bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Last Name
            </th>
            <th className="text-center  bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              User Name
            </th>
            <th className="text-center  bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="text-center  bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th className="text-center  bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Creation Date
            </th>
            <th className="text-center  bg-gray-100 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className=" py-2 sm:px-6 sm:py-4 whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.first_name}</td>
                <td className=" py-2 sm:px-6 sm:py-4 whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.last_name}</td>
                <td className=" py-2 sm:px-6 sm:py-4 whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.user_name}</td>
                <td className=" py-2 sm:px-6 sm:py-4 whitespace-no-wrap text-xs sm:text-sm text-gray-700">{user.email}</td>
                <td className=" py-2 whitespace-no-wrap  text-xs sm:text-sm text-gray-700">
                  {user.active ? (
                    <GrStatusGoodSmall className="text-xs inline-flex  text-lightgreen" />
                  ) : (
                    <GrStatusGoodSmall className="text-xs inline-flex  text-red-500" />
                  )}
                  {user.role}
                </td>
                <td className="text-center py-2 sm:px-6 sm:py-4 whitespace-no-wrap text-xs sm:text-sm text-gray-700">
                  {new Date(user.creation_date).toLocaleDateString('en-GB')}
                </td>
                <td className="text-center py-4 whitespace-no-wrap sm:py-4 sm:text-sm text-sm leading-5 justify-center flex space-x-3">
                  <button className="px-2 py-2 flex text-base justify-center text-white bg-yellow-500 rounded-lg hover-text-white focus:outline-none">
                    <BsBoxArrowDownRight className="w-4 h-6 mr-1" />
                    Details
                  </button>
                  <Link to={`/edit/${user._id}`} style={{ textDecoration: 'none' }} className="px-2 py-1 flex text-base justify-center text-white bg-blue-500 rounded-lg hover-text-white focus:outline-none">
                  <button className="px-2 py-1 flex text-base justify-center text-white bg-blue-500 rounded-lg hover-text-white focus:outline-none">
                    <FiEdit3 className="w-4 h-6 mr-1" />
                    Edit
                  </button>
                  </Link>
                  <button
                    className="px-2 py-2 flex text-base justify-center text-white bg-red-500 rounded-lg hover-text-white focus:outline-none"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedUser(user);
                    }}
                  >
                    <BsTrash className="w-4 h-6 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && (
  
  <PopUp  Title="Delete User"> 
      <DeleteUser setOpenModal={setOpenModal} handleDeleteUser={handleDeleteUser}/>
  </PopUp>
      )} 
     {addUser && (
  
  <PopUp  > 
      <AddUser setAddUser={setAddUser} handleSubmit = {handleSubmit}/>
  </PopUp>
   )} 

    </div>
)
}
    
    