import React, { Fragment,useState,useEffect } from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import { Popover, Transition, Menu } from '@headlessui/react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'; 
export default function Header() {
    const navigate =useNavigate()

    const token = localStorage.getItem('accessToken');

    // Function to decode a JWT
    function decodeToken(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    
      return JSON.parse(jsonPayload);
    }
    
    // Decode the access token
    const decodedToken = decodeToken(token);
    
    // Extract user ID from the decoded token
    const userId = decodedToken.id; // Replace 'userId' with the actual key used in your token
    
    
    const [user, setuser] = useState([]);
    
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3001/users/${userId}`,config);
        
        return response.data.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        const userData = await fetchUserData();
        setuser(userData);
        
      };
    
      fetchData();
    }, []);


  return (
    <div className=" rounded-b-3xl mx-5 bg-gray-100  px-4 flex flex-row p-3 bg-white  sm:flex-row md:flex-row justify-between items-center border-b border-gray-200">
    <div className="relative  ">
      <HiOutlineSearch
        fontSize={20}
        className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
      />
      <input
        type="text"
        placeholder="Search..."
        className="text-sm focus:outline-none active:outline-none h-10 w-full sm:w-full md:w-96 border border-gray-300 rounded-lg pl-11 pr-4"
      />
    </div>
    <div className="flex  gap-2 md:mr-2">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open && 'bg-gray-100',
                "p-1.5 rounded-sm inline-flex  text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
              )}
            >
              <HiOutlineChatAlt fontSize={24} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                  <strong className="text-gray-700 font-medium">Messages</strong>
                  <div className="mt-2 py-1 text-sm">This is the messages panel.</div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open && 'bg-gray-100',
                "p-1.5 rounded-sm inline-flex  text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
              )}
            >
              <HiOutlineBell fontSize={24} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                  <strong className="text-gray-700 font-medium">Notifications</strong>
                  <div className="mt-2 py-1 text-sm">This is the notification panel.</div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="ml-2  rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
            <span className="sr-only">Open user menu</span>
            <div
              className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
              
            >
              <img alt="" className='rounded-full  ' src={user.user_image}></img>
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
          <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active && 'bg-gray-100',
                    'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                  )}
                  onClick={() => navigate(`/profile/${userId}}`)}
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
                    'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                  )}
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active && 'bg-gray-100',
                    'text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2'
                  )}
                  onClick={() => navigate('/logout')}
                >
                  Logout
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  </div>)
}