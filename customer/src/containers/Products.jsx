import React, { useEffect, useState} from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Sort from '../components/Sort';
import styled from "styled-components";


function Collections() {
  const dispatch = useDispatch();
  const productsBySubCategory = useSelector((state) => state.productBySubcategory.productsBySubcategory);
  const onSortChange = (e) => {
    const selectedSortOption = e.target.value;
    handleSortChange(selectedSortOption);
    console.log(selectedSortOption)
  };

  
  const [sortedProducts, setSortedProducts] = useState([]);
  const handleSortChange = (selectedSortOption) => {
    let sorted = [];
    if (selectedSortOption === 'lowest') {
      sorted = [...productsBySubCategory].sort((a, b) => a.price - b.price);
      console.log("lowest " + sorted)
    } else if(selectedSortOption === 'highest') {
      sorted = [...productsBySubCategory].sort((a, b) => b.price - a.price);
    } else {
      sorted = [];
    }
    setSortedProducts(sorted);
  };
  
  console.log("sorted products "+ sortedProducts);
 
  return (
    <div className='flex flex-col gap-3 m-8'>
        <>
          <h1 className='font-medium'>PRODUCTS  {productsBySubCategory && productsBySubCategory.categoryName}</h1>
          <h3>{productsBySubCategory && productsBySubCategory.subcategoryName}</h3>
          <div className="flex justify-center " style={{ alignItems: 'flex-end' }}>
        <span className="text-xl font-Playfair font-karla">{productsBySubCategory && productsBySubCategory[0] && productsBySubCategory[0].length} ITEMS FOUND</span>
        
        <Wrapper className="sort-section">
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onChange={onSortChange}
            >
            <option value="lowest">Price (lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price (highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">without sort</option>
            <option value="#" disabled></option>
            
          </select>
        </form>
      </div>
    </Wrapper>

        </div>
          <div className='flex flex-col justify-start items-center gap-4 '>
            <div className='flex justify-center flex-wrap'>
            {productsBySubCategory && productsBySubCategory.map((productItem, index) => (
  <div key={index} className="flex  ">
    {productItem && productItem.map((product) => (
    <div key={product._id}  >

        <ProductCard product={product} />
    </div>
    ))}
    </div>
))}
              
            </div>
            <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'> Discover more  <FaArrowRight/></div>
          </div>

        </>
      )
    </div>
  );
}
const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
    
  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    
  }
  .sort-selection--style{
    width:140%;
  }
  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;
  }
  
`;
export default Collections;
