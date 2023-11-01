import React, { useState } from 'react';

import axios from 'axios'; 

import '../styles/main.css'

const AdminLogin = () => {

  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');

  const handleLogin = async () => {
    
        await axios.post('http://localhost:3001/login', {
        user_name: user_name,
        password: password})
      


      .then(res => {
        
        console.log('Data:', res.data);
      })
    
  };

    return (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('/bgimage.jpg') " }}>
                  <div className="mt-4 font-bold text-3xl font-playfair"><span className='text-customGray'>PREST</span><span className='text-green'>IGIOUS</span></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-playfair Display leading-9 tracking-tight text-white">
            Admin Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-3xl" style={{backgroundColor: 'white'}}>
          
          
          <form className="space-y-6 m-8" action="#" method="POST">
          <label htmlFor="email" className="block text-sm font-small leading-6 text-gray-500">
          Please fill in your unique admin login details below
              </label>
            <div>
            
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-500">
                username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <div>
                  
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  class="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                
                <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="link.com" className="font-semibold text-gray-600 hover:text-indigo-500">
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
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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