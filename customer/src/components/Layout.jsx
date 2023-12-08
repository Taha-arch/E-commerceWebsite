import React from 'react'
import NavbarDefault from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Layout() {

  return (
    <div className='primary-bg min-h-screen'>
      <NavbarDefault/>
      <div className='pt-28'>
        {<Outlet/>}
      </div>
     <div className='bottom-0'>
         <Footer/>
     </div>
    </div>
  )
}


export default Layout
