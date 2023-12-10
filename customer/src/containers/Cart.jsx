import React from 'react'
import OrderSummary from '../components/OrderSummary'
import CartItems from '../components/CartItems'
import CustomerSiderbar from '../components/CustomerSiderbar'
import ScrollToTop from "react-scroll-to-top";

export default function Cart() {
  return (
    <div className='bg-primary flex flex-col items-center  box'>
        <table className='w-4/6 h-full'>
            <tr>
               
               <div className='flex flex-col'>
                 <td className=''>
                    <CustomerSiderbar/>
                </td>
                <td>
                <OrderSummary/>
                </td>
                </div>
                <td rowSpan={2} className='pl-40'>
                    <div className='flex h-full flex-col justify-start mt-12 items-center'>
                        <div>
                            <h1>Shopping Cart</h1>
                            <p>You are eligible for Free Shipping.</p>
                        </div>
                        <div className=' h-fit overflow-y-scroll mt-10'>
                            <CartItems/>
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
