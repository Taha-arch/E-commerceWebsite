import React from 'react'
import ProductCard from '../components/ProductCard'
import { IoGrid } from "react-icons/io5";

export default function ProductsList() {
  return (
    <div className=' flex flex-col justify-center'>
        <div className='flex flex-col items-center'>
        <div className=' flex flex-row justify-start w-8/12  py-10'> 
            <h1 className='text-5xl  font-Playfair text-black'>HATS</h1>
        </div>
        <div className=' flex flex-row justify-between w-8/12'>
        <div className='text-sm font-oswald font-bold '>
            <span>51732 ITEMS FOUND</span>
        </div>
        <div className='flex flex-row text-xl items-center'>
            <IoGrid/>
            <select className='text-sm w-40 h-10 border-none'>
                <option value="">PRICE (HIGH TO LOW)</option>
            </select>
        </div>
        </div>
        </div>
        
        <div className=' flex flex-col items-center'>
            <div className='flex flex-row'>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
            <div className='flex flex-row'>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
        
    </div>
  )
}
