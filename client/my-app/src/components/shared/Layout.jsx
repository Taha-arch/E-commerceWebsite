import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
export default function Layout() {
  const token = localStorage.getItem('accessToken');

   if (!token){
     window.location.href='/login'}else{
  return (
    <div className='flex  w-full flex-col md:flex-row bg-neutral-100 h-screen w-screen '>
  <Sidebar />
  <div className='flex-1 w-full overflow-y-auto'>
    <Header />
    <div className='relative w-full '>
      {<Outlet />}
    </div>
  </div>
</div>
  )
}
}
