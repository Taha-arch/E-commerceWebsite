import React, { useEffect } from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProductDetails } from '../../src/Redux/slicers/Product/productServices';


function Collections() {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails.productDetails);
  const productsFound = useSelector((state) => state.productsFound.productFound);

  useEffect(() => {
    dispatch(fetchProductDetails());
  }, [dispatch]);

  return (
    <div className='flex flex-col gap-3 m-8'>
      {(!productsFound || productsFound.length === 0) ? (
        <>
          <h1 className='font-medium'></h1>
          <div className='flex flex-col justify-start items-center gap-4'>
            <div className='flex justify-start flex-wrap'>
              {productDetails && productDetails.map((product, index) => (
                <div key={index}><ProductCard product={product} /></div>
              ))}
            </div>
            <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'> Discover more  <FaArrowRight/></div>
          </div>

        </>
      ) : (
        <>
        <div className="flex justify-between">
        <span className="text-xl font-Playfair font-bold">{productsFound.length} ITEMS FOUND</span>
        <div>
          <ul>
            <li>PRICE (HIGH TO LOW)</li>
            <li>PRICE (LOW TO HIGH)</li>
          </ul>
        </div>
        </div>
        <div className='flex justify-start flex-wrap'>
          {productsFound && productsFound.map((product, index) => (
            
            <div key={index}>
              
              <ProductCard product={product} /></div>
          ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Collections;
