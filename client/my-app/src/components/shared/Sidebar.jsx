import { React, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation'
import classNames from 'classnames'
import { TbLogout } from 'react-icons/tb'
import { RxHamburgerMenu } from 'react-icons/rx'
const linkClasses = 'flex items-center  gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'



export default function Sidebar() {
  
        const handleLogout = () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href='/login';
          
        };
        const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    
    <div className="flex flex-row   md:flex-col rounded-tr-3xl  bg-gradient-to-b from-black to-sky-800  md:w-60 lg:w-80 p-3   text-white">
    <div className="flex justify-center py-2  ">
      <div className=" text-cyan-500 justify-center text-3xl">
        <span className="font-VarelaRound">PRESTIGIOUS</span>
      </div>
    </div>

    {/* Toggle button for small screens */}
    <div className="md:hidden">
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="text-white text-2xl cursor-pointer"
      >
        <RxHamburgerMenu />
      </button>
    </div>

    {/* Sidebar content for small screens (dropdown) */}
    <div className={`md:hidden justify-center  flex flex-col  gap-0.5 ${isMenuOpen ? 'block' : 'hidden'}`}>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}

      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}

      <button onClick={handleLogout} className={classNames(' cursor-pointer', linkClasses)}>
        <span className='text-xl'><TbLogout className='text-red'/></span>
        Logout
      </button>
    </div>

    {/* Sidebar content for medium and large screens */}
    <div className={`hidden md:flex lg:flex py-8 flex flex-col gap-0.7`}>
      {DASHBOARD_SIDEBAR_LINKS.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}
    </div>

    <div className={`hidden md:flex flex-col gap-0.5 pt-2 border-t border-white`}>
      {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item => (
        <SidebarLink key={item.key}  item={item} />
      ))}

      <button onClick={handleLogout} className={classNames(' cursor-pointer', linkClasses)}>
        <span className='text-xl'><TbLogout className='text-red'/></span>
        Logout
      </button>
    </div>
    </div>
  )
}


function SidebarLink({ item }){
const { pathname } = useLocation()


    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-yellow-400  text-white': 'text-white',linkClasses)}>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
        </Link>
    )
    }