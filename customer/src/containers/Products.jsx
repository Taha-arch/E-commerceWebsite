import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import Sort from "../components/Sort";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import PreLoader from "../components/PreLoader/PreLoader";

function Collections() {
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation()
  const productsBySubCategory = useSelector(
    (state) => state.productBySubcategory.productsBySubcategory
  );
  const onSortChange = (e) => {
    const selectedSortOption = e.target.value;
    handleSortChange(selectedSortOption);
    console.log(selectedSortOption);
  };

  const [sortedProducts, setSortedProducts] = useState([]);
  const handleSortChange = (selectedSortOption) => {
    let sorted = [];
    if (selectedSortOption === "lowest") {
      sorted = [...productsBySubCategory].sort((a, b) => a.price - b.price);
      console.log("lowest " + sorted);
    } else if (selectedSortOption === "highest") {
      sorted = [...productsBySubCategory].sort((a, b) => b.price - a.price);
    } else {
      sorted = [];
    }
    setSortedProducts(sorted);
  };

  console.log("sorted products" + sortedProducts);



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
    <div className="flex flex-col px-20 ">
      {/* <h1 className="font-medium">
          Products{productsBySubCategory && productsBySubCategory.categoryName}
        </h1>
        <h3>
          {productsBySubCategory && productsBySubCategory.subcategoryName}
        </h3> */}
      <div className="flex justify-between">
        <span className="text-xl  font-karla">
          {productsBySubCategory &&
            productsBySubCategory[0] &&
            productsBySubCategory[0].length}{" "}
          ITEMS FOUND
        </span>

        <div className="flex flex-row gap-4">
        <div className="cursor-pointer">
            {!search && (
              <CiSearch
                className="secondary-bg  text-3xl  top-1"
                onClick={() => setSearch(true)}
              />
            )}
            {search && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search product"
                  className="primary-bg w-40 h-10 pl-10  border-2  border-white rounded text-sm "
                  onChange={(e) => setQuery(e.target.value)}
                />
                <CiSearch className="secondary-bg absolute text-3xl left-1.5 top-1" />
              </div>
            )}
          </div>
          <div >
            <form action="#">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                className="px-5 py-2 border-2 border-black "
                onChange={onSortChange}
              >
                <option value="lowest">Price (lowest)</option>
                <option value="highest">Price (highest)</option>
                <option value="a-z">without sort</option>
              </select>
            </form>
          </div>

          
        </div>
      </div>
      <div className="flex flex-wrap justify-center  w-full">
        {productsBySubCategory &&
          productsBySubCategory.map((productItem, rowIndex) => (
            <div className="flex flex-wrap justify-center gap-2 w-full " key={rowIndex}>
              {productItem &&
                productItem.map((product) => (
                  <div
                    key={product._id}
                    className="w-1/2 lg:w-fit   mt-5 "
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              <hr className="color-black" />
            </div>
          ))}
      </div>

      <div className="w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black">
        {" "}
        Discover more <FaArrowRight />
      </div>
    </div>
    </div>
    </>
  );
}
// {productsBySubCategory &&
//   productsBySubCategory.map((productItem, index) => (
//     <div key={index} >
//       {productItem &&
//         productItem.map((product) => (
//           <div key={product._id}>
//             <ProductCard product={product} />
//           </div>
//         ))}
//     </div>
//   ))}

export default Collections;
