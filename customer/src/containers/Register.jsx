import '../styles/main.css'; 
import React, { useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import image from '../assets/images/sans.png';
import * as Yup from 'yup';
import { registerUser } from '../Redux/slicers/REGISTER/registerservice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function RegisterForm ()  {

  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error  = useSelector((state) => state.Register.error)

  const validationSchema = Yup.object().shape({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      confirm_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      const userData = { first_name, last_name, email, password, confirm_password };

      try {
          await validationSchema.validate(userData, { abortEarly: false });
          await dispatch(registerUser(userData));
          console.log(error)
          // if(error !== null){ 
          // navigate('/login');}
      } catch (error) {
          if (error instanceof Yup.ValidationError) {
              const fieldErrors = {};
              error.inner.forEach(err => {
                  fieldErrors[err.path] = err.message;
              });
              setErrors(fieldErrors);
          } else {
              console.error('Registration failed:', error);
          }
      }
  };

    return (
        
        <div className='flex '>
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6  pb-12 lg:px-8">
            
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-4 pt-6 text-center font-bold text-4xl font-playfair"><span className='text-black'>PREST</span><span className='text-truegreen'>IGIOUS</span></div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 title-form">
            Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
              </div>


              <div className="mt-2 w-full pl-1">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="last_name"
                  placeholder="Enter your last name"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2  focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                  onChange={(e) => { setLastname(e.target.value) }}
                />
                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
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
                 {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                {errors.password && <p className="text-red-500">{errors.password}</p>}
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
                {errors.confirm_password && <p className="text-red-500">{errors.confirm_password}</p>}
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-truegreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </div>
     
    );

};

export default RegisterForm;

