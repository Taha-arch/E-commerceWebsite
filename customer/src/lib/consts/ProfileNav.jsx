import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'


export const PROFILE_SIDEBAR_LINKS = [
   
    {
        key: 'profile',
        label: 'My Profile',
        path: '/profile/:id' 

    },
    {
        key: 'orders',
        label: 'My Orders',
        path: '/order'
    },
    {
        key: 'cart',
        label: 'My Cart',
        path: '/cart'
    },
    {
        key: 'favorites',
        label: 'My Favorites',
        path: '/favorites'
    }
]


export function SidebarReducedLink({ item }) {
    const { pathname } = useLocation();
  
    const linkClasses = classNames(
      'green-hover flex justify-start items-center w-full gap-2 font-light px-4 py-4  hover:no-underline rounded-sm h-10 font-medium',
      {
        'text-black bg-white': pathname !== item.path, // Not active link
        'green-bg text-white': pathname === item.path // Active link
      }
    );
  
    return (
      <Link to={item.path} className={linkClasses}>
        {item.label}
      </Link>
    );
  }
  