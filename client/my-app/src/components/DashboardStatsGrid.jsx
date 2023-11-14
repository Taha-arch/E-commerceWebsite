import React from 'react'
import { IoBagHandle } from 'react-icons/io5'
export default function DashboardStatsGrid() {
  return (
    <div className='flex flex-col md:flex-row gap-4 w-full'>
        <div className='flex flex-col md:flex-row  gap-4'>
        <BoxWrapper className='flex flex-col mb-4 md:mb-0'>
        <div className='rounded-full flex items-center justify-center bg-sky-300'>
            <IoBagHandle className=' text-white'/>
        </div>
        <div className='flex flex-col pl-4'>
            <span className=' text-gray-500 font-light'>Total sales</span>
            <div className='flex items-center'>
                <strong className=' text-gray-700 font-semibold'>$7498.95</strong>
                <span className=' text-green-500 pl-2'>+297</span>
            </div>
        </div>
    </BoxWrapper>
    <BoxWrapper className='flex flex-col mb-4 md:mb-0'>
        <div className='rounded-full flex items-center justify-center bg-sky-300'>
            <IoBagHandle className=' text-white'/>
        </div>
        <div className='flex flex-col pl-4'>
            <span className=' text-gray-500 font-light'>Total Orders</span>
            <div className='flex items-center'>
                <strong className=' text-gray-700 font-semibold'>$2698.95</strong>
                <span className=' text-green-500 pl-2'>+179</span>
            </div>
        </div>
    </BoxWrapper>
        </div>
    
    <div className='flex flex-col md:flex-row gap-4'>
    <BoxWrapper className='mb-4 md:mb-0'>
        <div className='rounded-full flex items-center justify-center bg-sky-300'>
            <IoBagHandle className=' text-white'/>
        </div>
        <div className='flex flex-col pl-4'>
            <span className=' text-gray-500 font-light'>Total expenses</span>
            <div className='flex items-center'>
                <strong className='text-gray-700 font-semibold'>$6498.95</strong>
                <span className='text-green-500 pl-2'>+356</span>
            </div>
        </div>
    </BoxWrapper>
    <BoxWrapper>
        <div className='rounded-full flex items-center justify-center bg-sky-300'>
            <IoBagHandle className=' text-white'/>
        </div>
        <div className='flex flex-col pl-4'>
            <span className='text-gray-500 font-light'>Total Customers</span>
            <div className='flex items-center'>
                <strong className=' text-gray-700 font-semibold'>$3498.95</strong>
                <span className=' text-green-500 pl-2'>+647</span>
            </div>
        </div>
    </BoxWrapper>
    </div>
    
</div>

  )
}

function BoxWrapper({ children }) {
    return (
        <div className='flex bg-white rounded-lg p-4 flex-1 border border-gray-200 shadow-xl cursor-pointer flex items-center sm:flex-col md:flex-row'>
            {children}
        </div>
    );
}

