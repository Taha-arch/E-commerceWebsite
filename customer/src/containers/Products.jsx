import React, { useEffect, useState } from "react";
import ProductCard from '../components/ProductCard'
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Sort from "../components/Sort";

function Collections() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  const productsBySubCategory = useSelector((state) => state.productBySubcategory.productsBySubcategory);
  const [sortedProducts, setSortedProducts] = useState([]);
  const handleSortChange = (selectedSortOption) => {
    let sorted = [...productsBySubCategory];
  
    if (selectedSortOption === 'lowest') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === 'highest') {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [];
    }
  
    setSortedProducts([...sorted]);
  };
  
  
  return (
    <div className='flex flex-col gap-3 m-8'>
      <>
        {(!sortedProducts || sortedProducts.length === 0) ? (
          <>
            <h1 className='font-medium'>PRODUCTS {productsBySubCategory && productsBySubCategory.categoryName}</h1>
            <h3>{productsBySubCategory && productsBySubCategory.subcategoryName}</h3>
            <div className="flex justify-center " style={{ alignItems: 'flex-end' }}>
              <span className="text-xl font-Playfair">{productsBySubCategory && productsBySubCategory[0] && productsBySubCategory[0].length} ITEMS FOUND</span>

              <Sort handleSortChange = {handleSortChange} />
            </div>
            <div className='flex flex-col justify-start items-center gap-4 '>
              <div className='flex justify-center flex-wrap'>
                {productsBySubCategory && productsBySubCategory.map((productItem, index) => (
                  <div key={index} className="flex">
                    {productItem && productItem.map((product) => (
                      <div key={product._id}>
                        {console.log(product.price)}
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black' 
                onClick={() => {}}
              > Discover more <FaArrowRight/>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className='font-medium'>PRODUCTS {productsBySubCategory && productsBySubCategory.categoryName}</h1>
            <h3>{productsBySubCategory && productsBySubCategory.subcategoryName}</h3>
            <div className="flex justify-center " style={{ alignItems: 'flex-end' }}>
              <span className="text-xl font-Playfair">{sortedProducts.length} ITEMS FOUND</span>

              <Wrapper className="sort-section">
                <div className="sort-selection">
                  <form action="#">
                    <label htmlFor="sort"></label>
                    <select
                      name="sort"
                      id="sort"
                      className="sort-selection--style"
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="lowest">Price (lowest)</option>
                      <option value="highest">Price (highest)</option>
                      <option value="a-z">without sort</option>
                    </select>
                  </form>
                </div>
              </Wrapper>
            </div>
            <div className='flex justify-center flex-wrap'>
              {sortedProducts.map((productItem, index) => (
                <div key={index} className="flex">
                  {productItem && productItem.map((product) => (
                    <div key={product._id}>
                      {console.log(product.price)}
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black' 
              onClick={() => {}}
            > Discover more <FaArrowRight/>
            </div>
          </>
        )}
      </>
    </div>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  // ... (existing styles remain the same)
`;

export default Collections;
