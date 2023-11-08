import React, { useState, useEffect } from 'react'
import {FiEdit3} from 'react-icons/fi'
import {BsTrash} from 'react-icons/bs'
import {BsBoxArrowDownRight} from 'react-icons/bs'
import {LuListFilter} from 'react-icons/lu'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {GrStatusGoodSmall} from 'react-icons/gr'
import {FaUsersLine} from 'react-icons/fa6'


import axios from 'axios'; 

export default function Users() {
  const [users, setUsers] = useState([]);
  const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users'); 
        return response.data.data; 
      } catch (error) {
          console.error('Error fetching user data:', error);
          return [];
      }
      };

        useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserData();
            setUsers(userData);
        };
    
        fetchData();
        }, []);
    return (
    
    <div className="  overflow-scroll overflow-x-auto " style={{ width: "100%"}}>
      <div className="flex justify-center p-3 bg-white  py-8" >
      <FaUsersLine className='m-1  text-4xl'/>
  <h1 className='text-4xl font-bold'>Users</h1>
  
</div>

      <div className="flex justify-between p-3 bg-white">
  <button className="px-4 py-2 flex text-base text-white bg-gray-500 rounded-lg hover-text-white focus:outline-none">
    <LuListFilter className="w-4 h-6 mr-1" />
    Filter
  </button>
  
  <button className="px-4 py-2 flex text-base text-white bg-lightgreen rounded-lg hover:bg-green-300 focus:outline-none">
  <AiOutlineUserAdd className="w-6 h-6 mr-1" />
  Add User
</button>
</div>
    <div className="  h-80 overflow-auto ">  
      <table className="table-auto   w-full ">
          <thead className='sticky top-0'>
          <tr >
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          First Name
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Last Name
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          User Name
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Email
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        
          Role
          
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Creation Date
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Actions
          
        </th>
        
      </tr>
    </thead>
    <tbody className=" overflow-auto bg-white divide-y divide-gray-200 ">
      {users.map((user) => (
        <tr key={user._id}>
          <td className=" text-center py-4 whitespace-no-wrap text-sm leading-5  text-gray-700">{user.first_name}</td>
          <td className=" text-center py-4 whitespace-no-wrap text-sm leading-5  text-gray-700">{user.last_name}</td>
          <td className=" text-center py-4 whitespace-no-wrap text-sm leading-5  text-blue-500">{user.user_name}</td>
          <td className=" text-center py-4 whitespace-no-wrap text-sm leading-5  ">{user.email}</td>
          <td className=" text-center py-4 whitespace-no-wrap text-sm leading-5 ">{user.active?(<GrStatusGoodSmall className='inline-flex mr-2 text-green-500'/>):(<GrStatusGoodSmall className='inline-flex mr-2 text-red-500'/>)}{user.role}</td>
          <td className=" text-center py-2 whitespace-no-wrap text-sm leading-5 ">{new Date(user.creation_date).toLocaleDateString('en-GB')}</td>
          <td className=" text-center py-4 whitespace-no-wrap text-sm leading-5 justify-center flex space-x-3">
            
            <button className="px-2 py-1 flex text-base justify-center text-white bg-yellow-500 rounded-lg hover-text-white focus:outline-none">
          <BsBoxArrowDownRight className="w-4 h-6 mr-1"/>
            Details
          </button>
            <button className="px-2 py-1 flex text-base justify-center text-white bg-blue-500 rounded-lg hover-text-white focus:outline-none">
          <FiEdit3 className="w-4 h-6 mr-1"/>
            Edit
          </button>
          <button className="px-2 py-1 flex text-base justify-center text-white bg-red-500 rounded-lg hover-text-white focus:outline-none">
          <BsTrash className="w-4 h-6 mr-1"/>
            Delete
          </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
   
  </div>      
    )
    }
    