import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSelector } from 'react-redux';
export default function Layout() {
  

  const user  = useSelector((state) => state.auth.user);
    
  
  useEffect(() => {
    console.log("PROFILE:", user);
  }, [user]);
  const token = localStorage.getItem('accessToken');

   if (!token){
     window.location.href='/login'
    }else{
  return (
    <div className='flex   flex-col md:flex-row bg-neutral-100 h-screen w-screen '>
  <Sidebar />
  <div className='flex-1   overflow-y-auto'>
    <Header />
    <div className='p-5 pb-0 rounded-xl relative   '>
      {<Outlet />}
    </div>
  </div>
</div>
  )
}
}
