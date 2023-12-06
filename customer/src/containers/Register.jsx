import '../styles/main.css'; 
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import image from '../assets/images/sans.png';



function RegisterForm ()  {

    const [first_name,setFirstname]= useState('')
    const [last_name,setLastname]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirm_password,setConPassword]= useState('')
    

    async function submit(e){
        e.preventDefault();

          const response =  await axios.post("http://localhost:3001/customers", {first_name, last_name, email, password,confirm_password})
            .then(res => console.log("its works " + response.data))
            .catch(e=> console.log(e))

    }
    const backgroundImageUrl = '../assets/sans.png';
    return (
      // <div className="bg-blur backdrop-blur-5 bg-cover bg-center h-screen " style={{ backgroundImage: url({image}) }}>
        
        <div className='flex '>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6  pb-12 lg:px-8">
            
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-4 pt-6 text-center font-bold text-4xl font-playfair"><span className='text-black'>PREST</span><span className='text-truegreen'>IGIOUS</span></div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 title-form">
            Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>

            <div className='flex '>
            <div className="mt-2 w-full pr-1">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  placeholder="Enter your first name"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  onChange={(e) => { setFirstname(e.target.value) }}
                />
              </div>


              <div className="mt-2 w-full pl-1">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="last_name"
                  placeholder="Enter your last name"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  onChange={(e) => { setLastname(e.target.value) }}
                />
              </div>
              </div>


              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>

              
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>


              <div className="mt-2">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirmed password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  onChange={(e) => { setConPassword(e.target.value) }}
                />
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-truegreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                onClick={submit}
              >
                Register in
              </button>
            </div>
          </form>

          <p className="mt-4  flex justify-between text-sm text-gray-500">
          <form className="space-y-6" action="#" method="POST">
          <input type="checkbox" name="checkbox" className='h-4'></input>
            <span className='pl-2'>Remember me</span>
           </form>
           <div>
            <a href="#" className="font-semibold leading-6 text-black hover:text-truegreen">
            Forgot password?
            </a>
            </div>

            
          </p>
          <div className='mt-8 text-center'>
          <p className='text-black'>Already have an account ?</p>
            <Link to="/login" className='black hover:text-truegreen
            '>Sign in</Link>
            </div>
        </div>
          
      </div>
      <div className='hidden md:block '>
      <div className='flex flex-col'>
      <div className='z-10 absolute mt-12 font-playfair pl-4 font-bold text-2xl'>Welcome to Prestigious: Your Access to </div>
      <div className='z-10 absolute mt-16 font-playfair pl-4 pt-4 text-xl'>
        <div className='relative  pl-4 text-truegreen font-bold flex items-center justify-start'> 
        <div className="line mr-2 border-b border-truegreen text-truegreen w-80"></div>
        <span>Luxury</span>
        </div>
        </div>
        </div>
        <div className='z-0'>
        <img src={image} className='h-screen w-full' alt="welcome to prestigious"/>
        </div>
      </div>
      </div>
     
    );

};

export default RegisterForm;

