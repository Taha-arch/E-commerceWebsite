import React, { useState } from 'react';
import axios from 'axios'; 
import swal from 'sweetalert'

export default function AddUser(props) {
  const {setAddUser} = props;

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });


  const notify = () => swal(
    {
      title: 'User added successfully',
      icon: 'success',
      button: 'close',
      className: 'alert',
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
try{

   await axios.post(`${process.env.REACT_APP_BASEURL}/user`, {
    first_name:  userInfo.firstName,
    last_name:  userInfo.lastName,
    email: userInfo.email,
    role: userInfo.role,
  }).then(
    
    notify,
    setAddUser(false)
);
}catch (error) {
  console.error('Error adding product:', error);
}
    
};

  return (
    <div className="max-w-2xl mx-auto mt-20 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Add User</h2>
      <form >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            placeholder="enter user's first name"
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="firstName"
            id="firstName"
            value={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            placeholder="enter user's last name"
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="lastName"
            id="lastName"
            value={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            placeholder="enter user's email"
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            name="email"
            id="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Role
          </label>
          <select
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="role"
            id="role"
            value={userInfo.role}
            onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
            >
            <option value="" disabled>{userInfo.role}</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        
        </div>
        

        <div className='flex justify-end gap-4'>
        
            <button
          className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg  hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300"
          type="submit"
          onClick={() => setAddUser(false)}
            >
                
                Cancel
            </button>
            <button
          className="bg-cyan-400 text-white font-semibold py-2 px-4 rounded-lg  hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-blue-300"
          type="submit"
          onClick={handleSubmit}
            >
                
                Save
            </button>
      
        </div>
      </form>
      
    </div>
  );
}


