import { React, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation'
import classNames from 'classnames'
import { TbLogout } from 'react-icons/tb'
import { RxHamburgerMenu } from 'react-icons/rx'
const linkClasses = 'flex justify-center md:justify-start  w-full gap-2 font-light px-3 py-2 hover:bg-gradient-to-r from-cyan-700 to-cyan-1000 hover:no-underline active:bg-cyan-700 rounded-sm text-base'



export default function Sidebar() {
  
        const handleLogout = () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href='/login';
          
        };
        const [isMenuOpen, setMenuOpen] = useState(false);
  
    
  return (
    
    <div className="flex justify-between flex-col pl-0  md:flex-col rounded-tr-3xl  bg-gradient-to-b from-black to-gray-700 lg:w-60 p-3   text-white">
  <div className="flex text-cyan-500 justify-between ml-5 py-5 text-2xl">
        <span className="font-VarelaRound">PRESTIGIOUS</span>
        {/* Toggle button for small screens */}
        <div className="flex md:hidden justify-between">
    
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="text-white text-2xl cursor-pointer"
      >
        <RxHamburgerMenu />
      </button>
    </div>
      </div>
    
    
    {/* Sidebar content for medium and large screens */}
<div className='flex  flex-col h-full justify-between'>
  <div className={`hidden md:flex lg:flex py-8 flex flex-col gap-0.7`}>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}
    </div>

    <div className={`hidden md:flex flex-col gap-0.5 pt-4`}>
      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item => (
        <SidebarLink key={item.key}  item={item} />
      ))}

      <button onClick={handleLogout} className={classNames(' cursor-pointer', linkClasses)}>
        <span className='text-xl px-2'><TbLogout className='text-red'/></span>
        Logout
      </button>
    </div>
</div>


    {/* Sidebar content for small screens (dropdown) */}
    <div className={`md:hidden flex flex-row justify-center gap-0.5 ${isMenuOpen ? 'block transition-all duration-300 ease-in' : 'hidden'}`}>
      <div className='flex flex-col w-full  justify-start'>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}

      <button onClick={handleLogout} className={classNames(' cursor-pointer', linkClasses)}>
        <span className='text-xl px-2'><TbLogout className='text-red'/></span>
        Logout
      </button>
      </div>
    </div>

    
    
      
    </div>
    
  )
}


function SidebarLink({ item }){
const { pathname } = useLocation()


    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'flex justify-start backdrop-blur w-full bg-gradient-to-r from-cyan-500 to-gray-1000    text-white': 'text-white',linkClasses)}>
        <span className='text-xl px-2'>{item.icon}</span>
        {item.label}
        </Link>
    )
    }
