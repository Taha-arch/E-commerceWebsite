import { React, useState } from 'react'
import { FcComboChart } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'
const linkClasses = 'flex items-center  gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'



export default function Sidebar() {
  
        const handleLogout = () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href='/login';
          
        };
        const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    
    <div className="flex flex-row   md:flex-col  bg-neutral-900 md:w-60 lg:w-80 p-3   text-white">
    <div className="flex  ">
      <div className=" font-bold justify-center text-3xl font-playfair">
        <span className="text-white">PREST</span>
        <span className="text-green">IGIOUS</span>
      </div>
    </div>

    {/* Toggle button for small screens */}
    <div className="md:hidden">
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="text-white text-2xl cursor-pointer"
      >
        ☰ {/* You can replace this with a hamburger menu icon */}
      </button>
    </div>

    {/* Sidebar content for small screens (dropdown) */}
    <div className={`md:hidden  flex flex-col  gap-0.5 ${isMenuOpen ? 'block' : 'hidden'}`}>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}

      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}

      <button onClick={handleLogout} className={classNames('text-red-500 cursor-pointer', linkClasses)}>
        <span className='text-xl'><HiOutlineLogout /></span>
        Logout
      </button>
    </div>

    {/* Sidebar content for medium and large screens */}
    <div className={`hidden md:flex lg:flex py-8 flex flex-col gap-0.7`}>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}
    </div>

    <div className={`hidden md:flex flex-col gap-0.5 pt-2 border-t border-neutral-700`}>
      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item => (
        <SidebarLink key={item.key}  item={item} />
      ))}

      <button onClick={handleLogout} className={classNames('text-red-500 cursor-pointer', linkClasses)}>
        <span className='text-xl'><HiOutlineLogout /></span>
        Logout
      </button>
    </div>
    </div>
  )
}


function SidebarLink({ item }){
const { pathname } = useLocation()


    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white': 'text-neutral-400',linkClasses)}>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
        </Link>
    )
    }
