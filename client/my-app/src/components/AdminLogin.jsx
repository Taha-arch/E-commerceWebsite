import React, { useState } from 'react';
import axios from 'axios'; 

import '../styles/main.css'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const AdminLogin = () => {

  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  

  const handleLogin = async () => {
    
        await axios.post('http://localhost:3001/login', {
        user_name: user_name,
        password: password})
        

      .then(res => {
       try {
       const accessToken = res.data.access_Token;
        const refreshToken = res.data.refresh_Token;

        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        if (accessToken && refreshToken){
          window.location.href='/';
        }else {
          return alert('invalid credentials!!!');
        }
        console.log('Data:', res.data);
      } catch (error) {
        console.err(error);
      }
      
      })
    
  };
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

    return (
        <div className="flex h-screen flex-1 flex-col justify-start px-6 py-8 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('/bgimage.jpg') " }}>
                  <div className="mt-4 font-bold text-3xl font-VarelaRound"><span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-400 to-white'>PRESTIGIOUS</span></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center font-bold text-3xl font-VarelaRound Display leading-9 text-gray-300">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto backdrop-blur-sm bg-gray-500/30 sm:w-full sm:max-w-sm rounded-3xl">
          
          
          <form className="space-y-6 m-8" >
          <label htmlFor="email" className="block text-lg ts-5 leading-6 text-white">
          
              </label>
            <div>
            
              <label htmlFor="username" className="block text-sm text-lg leading-6 text-white">
                username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-lg leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="inputgroup mt-2">
               
              <div className="relative">
  <input
    type={isPasswordVisible ? "text" : "password"}
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="current-password"
    required
    className="block absolute w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
  />
  <span
    className="absolute right-0 flex items-center px-3 py-3 text-black cursor-pointer"
    onClick={togglePasswordVisibility}
  >
    {isPasswordVisible ? (
      <FaRegEyeSlash />
    ) : (
      <FaRegEye />
    )}
  </span>
</div>

         
               
                
                <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="link.com" className="font-semibold text-white hover:text-indigo-500">
                    Forgot password ?
                  </a>
                </div>
              </div>
              </div>
            </div>

            <div>
              
            
            <button
            type="button"
            onClick={handleLogin}
            className="flex w-full justify-center rounded-md bg-black border-2 border-white hover:border-black mt-10 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
             
                Sign in
              </button>
              
            </div>
          </form>

          
        </div>
      </div>
    
    )
}

export default AdminLogin;