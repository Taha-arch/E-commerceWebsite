import React, { useEffect, useState} from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProduct } from '../../src/Redux/slicers/Product/productServices';
import { MdKeyboardArrowDown } from "react-icons/md";
import Sort from '../components/Sort';
import { FaArrowLeft } from "react-icons/fa";


function Collections() {

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const productsFound = useSelector((state) => state.productsFound.productFound);
  console.log(product);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const handleSortChange = (selectedSortOption) => {
    let sorted = [];
    if (selectedSortOption === 'lowest') {
      sorted = [...product].sort((a, b) => a.price - b.price);
      console.log("lowest " + sorted)
    } else if(selectedSortOption === 'highest') {
      sorted = [...product].sort((a, b) => b.price - a.price);
    } else {
      sorted = [];
    }
    setSortedProducts(sorted);
  };
  
  console.log("sorted products "+ sortedProducts);
 
  return (
    <div className='flex flex-col gap-3 m-8'>
      {(!productsFound || productsFound.length === 0) ? (
        <>
          <h1 className='font-medium'>PRODUCTS</h1>
          <div className="flex items-end justify-between" style={{ alignItems: 'flex-end' }}>
        <span className="text-xl font-Playfair font-bold">{product && product.length} ITEMS FOUND</span>

        <Sort handleSortChange={handleSortChange} />

        </div>
          <div className='flex flex-col justify-start items-center gap-4 '>
            <div className='flex justify-start flex-wrap'>
            {product && (sortedProducts.length > 0 ? sortedProducts : product).map((productItem, index) => (
  <div key={index}><ProductCard product={productItem} /></div>
))}
              
            </div>
            <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'> Discover more  <FaArrowRight/></div>
          </div>

        </>
      ) : (
        <>
        <div className="flex items-end justify-between" style={{ alignItems: 'flex-end' }}>
        <div><span className="text-xl font-Playfair font-sm">{productsFound.length} ITEMS FOUND</span></div>
       <div> <Sort handleSortChange={handleSortChange} className=""/></div>
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
