import React from 'react'
import { PROFILE_SIDEBAR_LINKS, SidebarReducedLink } from '../lib/consts/ProfileNav'

function CustomerSiderbar() {
  return (
    <div className='w-60 h-40 m-10 bg-white flex flex-col font-medium'>
      <div
          className={`text-center md:flex lg:flex flex flex-col gap-0.7`}
        >
          {PROFILE_SIDEBAR_LINKS.map((link) => (
            <SidebarReducedLink  key={link.key} item={link} />
          ))}
        </div>
    </div>
  )
}

export default CustomerSiderbar
