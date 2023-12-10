import React from 'react'
import CustomerSiderbar from '../components/CustomerSiderbar'
import OrderSummary from '../components/OrderSummary'
import FavoriteItems from '../components/FavoriteItems'
import OrderItems from '../components/OrderItems'
import ScrollToTop from "react-scroll-to-top";

export default function Orders() {
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
                              <h1>My Orders</h1>
                              
                          </div>
                          <div className=' h-fit w-full overflow-y-scroll mt-10'>
                              <OrderItems/>
                          </div>
                      </div>
                  </td>
              </tr>
          </table>
          <div >
          </div>
            <ScrollToTop smooth style={{
                      position: 'fixed',
                      bottom: '20px',
                      right: '40px',
                      cursor: 'pointer',
                      background: '#2F5951',
                      borderRadius: '10%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '50px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}/>
      </div>
    )
  }