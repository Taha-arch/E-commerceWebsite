import React, { useState } from 'react';
import { FaRegHeart,FaHeart  } from "react-icons/fa";
import '../styles/index.css'
import { useNavigate } from 'react-router-dom'

export default function ProductCard(props) {
  const [isButtonActive, setButtonActive] = useState(false);
  const { product} = props; 
  // console.log("props " + product);
  const toggleButton = (event) => {
    event.stopPropagation();
    setButtonActive(!isButtonActive);
  };
  const navigate = useNavigate();
  return (
    <div className='w-auto cursor-pointer'>
        <div className=' flex justify-center items-center h-full  '>
        <div className='card w-64 h-fit bg-white border m-5 rounded-2xl' onClick={() => navigate(`/product/${product && product._id}`)}>
            <div className='flex justify-between '>
              <div className='bg-orange-500 h-fit font-bold   text-md  ml-4 pl-2 pr-1 pt-0 mt-2    text-white '>
              <span>{product && Math.floor(((product.discountPrice * 100) / product.price))} %</span>
              </div>
                <button className='heart rounded-full  m-2  text-lg p-3 text-red-500  ' onClick={(event) =>toggleButton(event) } >{isButtonActive ? <FaHeart /> : <FaRegHeart /> }</button>
            </div>
            <div className=' mx-5 py-2'>
              <img alt='' src={product && product.productImage[0]} className='cardimage w-full h-auto rounded-xl'></img>
            </div>
            <div className='flex justify-center'>
            <div className='flex flex-col w-60 pt-2 pb-2'>
              <div className='mx-5 mb-3 flex flex-row justify-center font-bold'>
                <span onClick={() => navigate(`/productDetails/${product._id}`)}>{product && product.productName}</span>
              </div>
              <div className=' mx-5 flex flex-row justify-between'>
                <span className='font-bold text-lg'>{product && product.price}DH</span>
                <span className='font-bold text-lg text-orange-500 line-through'>{product && product.discountPrice}DH</span>
              </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
