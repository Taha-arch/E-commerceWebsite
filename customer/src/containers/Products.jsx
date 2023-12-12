import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import {useNavigate, useParams} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import {sortProduct} from "../Redux/slicers/Product/productServices";
import PreLoader from "../components/PreLoader/PreLoader";

function Products() {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const location = useLocation()
  const sortedProducts = useSelector((state) => state.sortedProducts.sortProduct);
  const [sortedByPrice, setSortedByPrice] = useState([]);


  const productsBySubCategory = useSelector(
    (state) => state.productBySubcategory.productsBySubcategory
  );

  const {category, subcategory} = useParams();

  const filteredProducts = sortedProducts && sortedProducts.filter(
    (item) => item.categoryName === category && item.subcategoryName === subcategory);

  const onSortChange = (e) => {
    const selectedSortOption = e.target.value;
    dispatch(sortProduct());
     
    if(selectedSortOption === "lowest"){
      setSortedByPrice(filteredProducts);
    }else if (selectedSortOption === "highest"){
      const revesedArray = [...filteredProducts].reverse();
      setSortedByPrice(revesedArray);
    }else{
      setSortedByPrice([]);
    }
  };
  useEffect(() => {
    setSortedByPrice([]);
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
      <h1 className="font-medium py-2">{subcategory}</h1>

      <div className="flex justify-between">
        <span className="text-xl font-fairly py-2">
          {productsBySubCategory &&
            productsBySubCategory.flat().length} ITEMS FOUND
        </span>

        <div className="flex flex-row gap-4">
          <div>
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

      <div className="">
        {(sortedByPrice.length === 0 || sortedByPrice === undefined) ? (
          productsBySubCategory &&
          productsBySubCategory.map((productItem, rowIndex) => (
            <div className="flex flex-wrap justify-center " >
              <div className="flex flex-row flex-wrap  justify-center " key={rowIndex}>

              {Array.isArray(productItem) && 
                productItem.map((product) => (
                  <div key={product._id} className="w-1/2 lg:w-fit mt-5">
                    <ProductCard product={product} />
                  </div>
                ))}
                </div>
            </div>
          ))
        ) : (
          <div className=" flex flex-wrap justify-center">
  {sortedByPrice && sortedByPrice.map((productItem) => (
    <div key={productItem._id}>
      <div className="flex flex-row">
        <div className="w-1/2 lg:w-fit mt-5">
          <ProductCard product={productItem} />
        </div>
      </div>
      <hr className="color-black" />
    </div>
  ))}
</div>
        )}
      </div>

      <div className="relative left-74 w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl my-4 gap-2 hover:bg-black"
        onClick={() => {
          navigate(`/collections`);
        }}
      >
        COLLECTIONS <FaArrowRight />
      </div>

      <ScrollToTop
        smooth
        style={{
          position: "fixed",
          bottom: "20px",
          right: "40px",
          cursor: "pointer",
          background: "#2F5951",
          borderRadius: "10%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          fontSize: "50px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
    </div>
   </>
  );
}


export default Products;
