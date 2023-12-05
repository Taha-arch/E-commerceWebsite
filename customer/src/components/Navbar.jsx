import React, { useState , Fragment} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Transition, Menu } from '@headlessui/react'
import "../styles/main.css";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { TbHeart } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import classNames from 'classnames'
import { useSelector , useDispatch} from 'react-redux'
import { logout } from '../Redux/slicers/AUTH/authServices'


function Navbar() {
    const [search, setSearch] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const customer =useSelector((state) => state.auth.customer)

    const handleLogout = () => {
      dispatch(logout())
    }
  return (
    <div className=" md:fixed w-full primary-bg z-10 ">
    <div className="box primary-bg">
      <div>
        <div className="mb-7 pt-6  ">
          <nav className="flex justify-between items-center">

            <div className="font-bold text-xl md:text-3xl ">
              <span>PREST</span>
              <span className="secondary-bg">IGIOUS</span>
            </div>

            <div className="font-bold flex flex-col md:flex-row justify-between gap-5">
              <NavLink to="/home" className="nav-link ">HOME</NavLink>
              <NavLink to="/collections" className="nav-link ">COLLECTIONS</NavLink>
              <NavLink to="/about us" className="nav-link ">ABOUT US</NavLink>
            </div>

            <div className="icon-size flex flex-row justify-between items-center gap-4 ml-20">
            <div className="cursor-pointer">  
            {!search && <CiSearch className="secondary-bg" onClick={() =>setSearch(true)}/>}
            {search && (
  <div className="relative">
    <input
      type="text"
      placeholder="Search product"
      className="primary-bg w-40 h-10 pl-10  border-2  border-white rounded text-sm"
      
    />
    <CiSearch className="secondary-bg absolute left-1.5 top-3.5"/>
  </div>
)}

            </div>
            <div className='cursor-pointer' onClick={() => navigate('/cart')}>  <IoBagOutline /></div>
            <div>  <TbHeart /></div>
            <div>  {!customer ?
             <div className="cursor-pointer" onClick={() => navigate('/login')}>  <FaUserCircle /> </div>
             :
              <Menu as="div" className="relative mt-3">
        <div>
          <Menu.Button className=" rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
            <span className="sr-only">Open user menu</span>
            
            <div
              className="h-10 w-10 rounded-full  bg-cover bg-no-repeat bg-center"

              style={{ 
                backgroundImage: `url(${customer && customer.customer_image})`,
              }}
            >
              
              <span className="sr-only">Taha El atoui</span>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-36 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active && 'bg-gray-100',
                    'text-sm text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                  )}
                  onClick={() => navigate(`/profile/${customer._id}}`)}
                >
                  Your Profile
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active && 'bg-gray-100',
                    'text-sm text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                  )}
                  onClick={() => {handleLogout()}}
                >
                  Logout
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu> }
              </div>
            </div>

          </nav>
        </div>
        <hr />
      </div>
    </div>
    </div>
  );
}

export default Navbar;
