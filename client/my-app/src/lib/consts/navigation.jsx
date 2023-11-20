import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'


export const DASHBOARD_SIDEBAR_LINKS = [
   
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/' ,
        icon: <HiOutlineViewGrid />

    },
    {
        key: 'products',
        label: 'Products',
        path: '/products',
        icon: <HiOutlineCube />
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/orders',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'users',
        label: 'Users',
        path: '/users',
        icon: <HiOutlineUsers />
    }
    
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]

export function SidebarReducedLink({ item, linkClasses = 'flex justify-start  w-full gap-2 font-light px-4 py-4 hover:bg-gradient-to-r from-cyan-700 to-cyan-1000 hover:no-underline active:bg-cyan-700 rounded-sm text-base'
}) {
    const { pathname } = useLocation();

    return (
        <Link to={item.path} className={classNames('flex justify-start transition-all duration-400',pathname === item.path ? 'flex justify-start backdrop-blur w-full bg-gradient-to-r from-cyan-500 to-gray-1000 text-white' : 'text-white', linkClasses)}>
            <span className='text-2xl '>{item.icon}</span>
        </Link>
    );
}


