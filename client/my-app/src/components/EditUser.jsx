import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RiEdit2Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/HoverBlur.css'



export default function EditUser(  user, onSubmit ) {
  
  
  
  const token = localStorage.getItem('accessToken');

 
  
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
});


const { id } = useParams();
  useEffect(() => {
    const config = {
        headers: { Authorization: `Bearer ${token}`}
        }
        
    axios.get(`http://localhost:3001/users/${id}`, config)
        .then((response) => {
        setUserInfo(response.data.data);
        
        })
        .catch((error) => {
        console.error('Error fetching user data:', error);
        });
    }, [id]);


  const notify = () => {toast.success('User Updated Successfully!', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
};




const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use the 'put' method to update the user data.
    axios.put(`http://localhost:3001/users/${id}`, {
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        email: userInfo.email,
        role: userInfo.role,
        username: userInfo.username,
    }).then(() => {
        notify();
    });
  };


  if (!userInfo) {
    return <div>Loading user data...</div>;
  }

  
 
   


  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User</h2>
      <form className='flex flex-col justify-start' >
        <div className='flex justify-start gap-10 mb-10'>
        

          <div className='profile '>
            <div className='profile-img bg-[url("https://source.unsplash.com/150x150?face")] bg-no-repeat bg-cover'></div>
            <div className="icon ">
                <RiEdit2Fill className="  text-white  text-3xl" />
              </div>
          </div>

          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            User Name
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="UserName"
            id="UserName"
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            required
            placeholder={userInfo.user_name}
          />
          
        </div>
        </div>
        <div className="mb-4 gap-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="firstName"
            id="firstName"
            value={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            required
            placeholder={userInfo.first_name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="lastName"
            id="lastName"
            value={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            required
            placeholder={userInfo.last_name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
            placeholder={userInfo.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            Role
          </label>
          <select
            className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="roles"
            id="role"
            onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
            >
            <option value="" disabled>{userInfo.role}</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
            <option value="User" >User</option>
          </select>
        </div>
        
        
        <div className='flex justify-center'>
          <button
            className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
            onClick={handleSubmit}
          >
            Update User
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

