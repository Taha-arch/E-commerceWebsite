import React, { useEffect, useState } from "react";
import ProductCard from '../components/ProductCard';
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchProductFound } from '../../src/Redux/slicers/Product/productServices';
import { useNavigate, useParams } from "react-router-dom";
import { removeSearchQuery, clearSearchQuery } from "../Redux/slicers/SearchQuery";
import { clearProductFound } from "../Redux/slicers/Product/SearchProductSlice";

function CollectionPerCategory() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  const { categoryURL } = useParams();
  const productFound = useSelector((state) => state.productsFound.productFound);
  const SearchQuery = useSelector((state) => state.searchQuery.SearchQuery);
  const [productsFound, setProductsFound] = useState([]);

  useEffect(() => {
    if (SearchQuery) {
      dispatch(fetchProductFound(SearchQuery));
    } else {
      dispatch(clearSearchQuery()); 
    }
  }, [dispatch, SearchQuery]);

  useEffect(() => {
    if (!SearchQuery) {
      dispatch(clearProductFound());
    }
  }, [SearchQuery, dispatch]);

  console.log("product found " + productFound);
  useEffect(() => {
    if (productFound && productFound.length > 0 && categoryURL) {
      console.log('Product :', productFound);
      const filteredProducts = productFound.filter((productItem) => {
        return productItem.categoryName === categoryURL;
      });
      setProductsFound(filteredProducts);
    }
  }, [categoryURL, productFound]);

  return (
    <div className='flex flex-col gap-3 m-8'>
      <h1 className='font-medium'>COLLECTIONS </h1>
      {(!productsFound || productsFound.length === 0) ? (
        <>
          {categories && products && categories.filter((category) => category.category_name === categoryURL)
            .map((category) => (
              <div key={category._id}>
                <h1 className='font-fairly'>{category.category_name}</h1>
                <div className='flex flex-col justify-start gap-4 '>
                  <h1 className='font-fairly text-xl'>{products && products.length} ITEMS FOUND</h1>
                  <div className='flex justify-start flex-wrap'>
                    {products.filter((productItem) => productItem.categoryName === category.category_name)
                      .map((productItem) => (
                        <div key={productItem._id}>
                          <ProductCard product={productItem} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          <div
            className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'
            onClick={() => {
              navigate(-1)
            }}
          >
            COLLECTIONS <FaArrowRight />
          </div>
        </>
      ) : (
        <>
          {categories && categories.filter((category) => category.category_name === categoryURL)
            .map((category) => (
              <div key={category._id}>
                <h1 className='font-fairly'>{category.category_name}</h1>
                <div className='flex flex-col justify-start gap-4 '>
                  <h1 className='font-fairly text-xl'>{productsFound && productsFound.length} ok ITEMS FOUND</h1>
                  {SearchQuery && productFound && productFound.length > 0 ? (
                    <div className='flex justify-start flex-wrap'>
                      {productsFound
                        .map((productItem) => (
                          <div key={productItem._id}>
                          <ProductCard product={productItem} />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p>No products found. ok </p>
                  )}
                </div>
              </div>
            ))}
          <div
            className='w-56 h-16 cursor-pointer green-bg text-white flex items-center justify-center rounded-sm text-xl gap-2 hover:bg-black'
            onClick={() => {
              navigate(-1)
            }}
          >
            COLLECTIONS <FaArrowRight />
          </div>
        </>
      )}
    </div>
  );
}

export default CollectionPerCategory;
