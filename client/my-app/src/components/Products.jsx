import React, { useState, useEffect } from 'react'

import axios from 'axios'; 

export default function Products() {
    const [products, getProducts] = useState([]);
    const fetchProductData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/products'); 
          return response.data.data; 
        } catch (error) {
            console.error('Error fetching product data:', error);
            return [];
        }
        };



        useEffect(() => {
        const fetchData = async () => {
            const productData = await fetchProductData();
            getProducts(productData);
        };
    
        fetchData();
        }, []);
    return (
    
      
            
  <table className="min-w-full" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
    <thead>
      <tr>
        
        <th className=" text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        SKU
        </th>
        <th className=" text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        Image
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        Name
        </th>
        <th className="text-centerpy-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        Category
        </th>
        <th className="text-center  py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        Price
        </th>
        <th className="text-center py-3 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
        Quantity
        </th>
        <th className=" text-center py-3 pl-25 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {products.map((product) => (
        <tr key={product._id}>
          <td className="py-4 whitespace-no-wrap text-sm leading-5 text-center">{product.sku}</td>
          <td className="py-4 whitespace-no-wrap text-sm leading-5 text-center"><img alt="product" src={product.productImage} className='w-20 h-20'></img></td>
          <td className="py-4 whitespace-no-wrap text-sm leading-5 text-center">{product.productName}</td>
          <td className="py-4 whitespace-no-wrap text-sm leading-5 text-center">{product.categoryName}</td>
          <td className="py-4 whitespace-no-wrap text-sm leading-5 text-center">{product.price}</td>
          <td className="py-4 whitespace-no-wrap text-sm leading-5 text-center">{product.quantity}</td>
          <td className="py-4 mt-6 whitespace-no-wrap text-right text-sm leading-3 flex space-x-3">
            
          <button className="px-4 py-2 text-white bg-yellow-500 hover-text-white focus:outline-none text-center">
                View Details
            </button>
            <button className="px-4 py-2 text-white bg-indigo-500 hover-text-white focus:outline-none text-center">
                Update
            </button>
            <button className="px-4 py-2 text-white bg-red-500 hover-text-white focus:outline-none text-center">
                DELETE
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>


    
    )
    }