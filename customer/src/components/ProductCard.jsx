import React, { useState } from 'react';
import { FaRegHeart,FaHeart  } from "react-icons/fa";
import '../styles/index.css'

export default function ProductCard() {
  const [isButtonActive, setButtonActive] = useState(false);

  const toggleButton = () => {
    setButtonActive(!isButtonActive);
  };
  return (
    <div className='w-auto cursor-pointer'>
        <div className=' flex justify-center items-center h-full  '>
        <div className='card w-80 h-fit bg-white border m-5 rounded-2xl'>
            <div className='flex justify-between '>
              <div className='bg-orange-500 h-fit font-bold   text-md  ml-4 pl-2 pr-1 pt-0 mt-2    text-white '>
              <span>10%</span>
              </div>
                <button className='heart rounded-full flex m-2  text-lg p-3 text-red-500  ' onClick={toggleButton}>{isButtonActive ? <FaHeart /> : <FaRegHeart />}</button>
            </div>
            <div className='mx-5 py-2'>
              <img alt='' src='/lunette.jpg' className='w-full h-72 rounded-xl'></img>
            </div>
            <div className='flex justify-center'>
            <div className='flex flex-col w-60 pt-5 pb-2'>
              <div className='flex flex-row justify-center text-lg font-inter font-bold'>
                <span>Tissot watch</span>
              </div>
              <div className='flex flex-row justify-between'>
                <span className='font-bold text-lg'>1000DH</span>
                <span className='font-bold text-lg text-orange-500 line-through'>150DH</span>
              </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
