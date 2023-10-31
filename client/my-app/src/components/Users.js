import React, { useState, useEffect } from 'react'

import axios from 'axios'; 

export default function Users() {
    const [users, setUsers] = useState([]);
    const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/users'); // Replace with your API endpoint
          return response.data.data; // Access the "data" field which contains the array of users
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
    
    
        <div className="overflow-x-auto">
            
  <table className="min-w-full">
    <thead>
      <tr>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          ID
        </th>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          First Name
        </th>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Last Name
        </th>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          User Name
        </th>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Role
        </th>
        <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
          Creation Date
        </th>
        <th className="px-6 py-3 bg-gray-100"></th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user) => (
        <tr key={user._id}>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">{user._id}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">{user.first_name}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">{user.last_name}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-blue-500">{user.user_name}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-blue-500">{user.email}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{user.role}</td>
          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{user.creation_date}</td>
            <td className="px-4 py-4 whitespace-no-wrap text-right text-sm leading-3 flex space-x-3">
            <button className="px-4 py-2 text-white bg-indigo-500 hover-text-white focus:outline-none">
                View Details
            </button>
            <button className="px-4 py-2 text-white bg-indigo-500 hover-text-white focus:outline-none">
                View Details
            </button>
            <button className="px-4 py-2 text-white bg-indigo-500 hover-text-white focus:outline-none">
                View Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
    )
    }

    