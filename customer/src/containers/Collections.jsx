import React, { useEffect, useState} from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import  { fetchProduct } from '../../src/Redux/slicers/Product/productServices';
import {fetchProductFound} from '../Redux/slicers/Product/productServices';
import { NavLink, useNavigate, Link, Navigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import PreLoader from "../components/PreLoader/PreLoader";

function Collections() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const location = useLocation()
  const product = useSelector((state) => state.product.product);
  const productsFound = useSelector((state) => state.productsFound.productFound);
  const SearchQuery = useSelector((state) => state.searchQuery.SearchQuery);
  const categories = useSelector((state) => state.categories.categories); 
  // const [maxProductsPerCategory, setProductsPerCategory] = useState(6)
  let TotalProductsPerCategory;
  const navigate = useNavigate(); 


  useEffect(() => {
      dispatch(fetchProductFound(SearchQuery));
}, [dispatch, SearchQuery]);

  const maxProductsPerCategory = 8;

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    setLoading(true)
   const timer = setTimeout(() => {
     setLoading(false);
     
   }, 3000);
   return () => clearTimeout(timer);
  }, [location.pathname]);



  return (
    <>
    {loading && <PreLoader/>}
    <div className={loading? 'hidden': ''} data-aos={loading ? 'fade-out' : 'fade-in'}>
    <div className='flex flex-col gap-3 m-8 px-20'>
      <h1 className='font-medium'>COLLECTIONS</h1>
      {categories && product && categories.map((category)=> (
        <div key={category._id}>
          <h1 >{category.category_name}</h1>
          <div className='flex flex-col justify-start items-center gap-4 '>
            <div className='flex justify-center flex-wrap gap-2'>
            {(productsFound && productsFound.length > 0 ?
                productsFound
                  .filter((productItem) => productItem.categoryName === category.category_name)
                  .slice(0, maxProductsPerCategory)
                :
                product
                  .filter((productItem) => productItem.categoryName === category.category_name)
                  .slice(0, maxProductsPerCategory)
                  .map((productItem, index) => (
                <div key={index}>
                  <ProductCard product={productItem} />
                </div>
              )))}
            </div>
            <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'
            onClick={()=>{
              TotalProductsPerCategory = product.length; 
              // setProductsPerCategory(TotalProductsPerCategory);
              navigate(`/collections/${category.category_name}`)
            }}
            >
              Discover more <FaArrowRight/>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
      <ScrollToTop smooth style={{
                      smooth: 'true',
                      position: 'fixed',
                      bottom: '20px',
                      right: '40px',
                      cursor: 'pointer',
                      background: '#F8F8F8',
                      borderRadius: '10%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '50px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          }}/>
    </>
  );
}

export default Collections;
