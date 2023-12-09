import React from 'react'
import CustomerSiderbar from '../components/CustomerSiderbar'
import FavoriteItems from '../components/FavoriteItems'

export default function Favorites() {
  return (
    <div className='bg-primary flex flex-col items-center'>
        <table className='w-4/6 h-full'>
            <tr>
               
               <div className='flex flex-col'>
                 <td className=''>
                    <CustomerSiderbar/>
                </td>
                
                </div>
                <td rowSpan={2} className='pl-40'>
                    <div className='flex h-full  flex-col justify-start mt-5 items-center'>
                        <div>
                            <h1>My Favorites</h1>
                            
                        </div>
                        <div className=' h-fit w-full overflow-y-scroll mt-10'>
                            <FavoriteItems/>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <div >
        </div>
    </div>
  )
}
