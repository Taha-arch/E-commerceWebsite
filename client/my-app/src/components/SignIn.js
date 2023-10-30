import '../styles/main.css'; 
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import image from '../assets/sans.png';




function SignInForm ()  {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    
    async function submit(e){
      e.preventDefault();

        await axios.post("http://localhost:3001/customers/login", {email, password})
          .then(res => console.log(res.data))
          .catch(e=> console.log(e))
  }

const inputText = "text";
const inputEmail = "email";
const inputPassword = "password";

    return (
        
      <div className='flex '>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  pb-12 lg:px-8">
          
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-2 pt-6 text-center font-bold text-3xl font-playfair"><span className='text-black'>PREST</span><span className='text-green'>IGIOUS</span></div>
        <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-playfair">
         Access account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>

          

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


            

          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
              onClick={submit}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-4  flex justify-between text-sm text-gray-500">
        <form className="space-y-6" action="#" method="POST">
        <input type="checkbox" name="checkbox" className='h-4'></input>
          <span className='pl-2'>Remember me</span>
         </form>
         <div>
          <a href="#" className="font-semibold leading-6 text-black hover:text-green">
          Forgot password?
          </a>
          </div>

          
        </p>
        <div className='mt-20  text-center'>
        <p className='text-black'>You don't have an account ?</p>
          <Link to="/Register" className='black hover:text-green'>Register</Link>
          </div>
      </div>
        
    </div>
    <div className='hidden md:block '>
      <div className='z-10 absolute mt-12 font-playfair pl-4 font-bold text-2xl'>Welcome to Prestigious: Your Access to </div>
      <div className='z-10 absolute mt-16 font-playfair pl-4 pt-4 text-xl'>
        <div className='absolute w-4/5 pr-2 h-px bg-green mt-4'></div>
        <div className='relative ml-80 pl-4 text-green font-bold '>Luxury</div>
        </div>
      <div className='z-0'>
      <img src={image} className='h-screen w-full' alt="welcome to prestigious"/>
      </div>
    </div>
    </div>
    );

};

export default SignInForm;


