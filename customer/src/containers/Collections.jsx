import React, { useEffect, useState} from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProduct } from '../../src/Redux/slicers/Product/productServices';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";


// function Collections() {

//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.product.product);
//   const productsFound = useSelector((state) => state.productsFound.productFound);
//   const categories = useSelector((state) =>state.categories.categories); 
//   const maxProductsPerCategory = 6;
//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);
  
//   return (
//     <div className='flex flex-col gap-3 m-8'>
//       {(!productsFound || productsFound.length === 0) ? (
//         <>
//           <h1 className='font-medium'>COLLECTIONS</h1>
//           {categories && product && categories.map((category)=> (
//             <div key={category._id}>
//               <h1 className='font-medium'>{category.category_name} ok</h1>
//               <div className='flex flex-col justify-start items-center gap-4 '>
//                 <div className='flex justify-start flex-wrap'>
//                   {product
//                     .filter((productItem) => productItem.categoryName === category.category_name)
//                     .slice(0, maxProductsPerCategory) 
//                     .map((productItem) => (
//                       <div key={productItem._id}>
//                         <ProductCard product={productItem} />
//                       </div>
//                     ))}
//                 </div>
//                 <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'>
//                   Discover more <FaArrowRight/>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <>
//         <div className="flex items-end justify-between" style={{ alignItems: 'flex-end' }}>
//         <div><span className="text-xl font-Playfair font-sm">COLLECTIONS </span></div>

//       <div></div>
//         </div>
//         <div className='flex justify-start flex-wrap'>
        
//           {productsFound && productsFound.map((product, index) => (
//             <div key={index}>
//               <ProductCard product={product} /></div>
//           ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Collections;

function Collections() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const productsFound = useSelector((state) => state.productsFound.productFound);
  const categories = useSelector((state) => state.categories.categories); 
  const maxProductsPerCategory = 8;

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  
  return (
    <div className='flex flex-col gap-3 m-8 px-20'>
      <h1 className='font-medium'>COLLECTIONS</h1>
      {categories && product && categories.map((category)=> (
        <div key={category._id}>
          <h1 >{category.category_name}</h1>
          <div className='flex flex-col justify-start items-center gap-4 '>
            <div className='flex justify-center flex-wrap'>
            {(productsFound && productsFound.length > 0 ?
                productsFound
                  .filter((productItem) => productItem.categoryName === category.category_name)
                  .slice(0, maxProductsPerCategory)
                :
                product
                  .filter((productItem) => productItem.categoryName === category.category_name)
                  .slice(0, maxProductsPerCategory)
              ).map((productItem, index) => (
                <div key={index}>
                  <ProductCard product={productItem} />
                </div>
              ))}
            </div>
            <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'>
              Discover more <FaArrowRight/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collections;
