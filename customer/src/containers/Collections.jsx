import React, { useEffect } from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProduct } from '../../src/Redux/slicers/Product/productServices';


function Collections() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const productsFound = useSelector((state) => state.productsFound.productFound);
  console.log(product);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className='flex flex-col gap-3 m-8'>
      {(!productsFound || productsFound.length === 0) ? (
        <>
          <h1 className='font-medium'></h1>
          <div className='flex flex-col justify-start items-center gap-4'>
            <div className='flex justify-start flex-wrap'>
              {product && product.map((product, index) => (
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
