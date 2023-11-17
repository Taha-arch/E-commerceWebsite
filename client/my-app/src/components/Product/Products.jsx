import React, { useState, useEffect, Fragment } from 'react';
import {FiEdit} from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import {TbListDetails} from 'react-icons/tb';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {RiMoreLine} from 'react-icons/ri';
import {Transition, Menu } from '@headlessui/react'
import PopUp from '../PopUp';
import classNames from 'classnames';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import ProductDelete from './ProductDelete';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

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
      setProducts(productData);
    };

    fetchData();
  }, []); 

  const navigate = useNavigate();

  return (
    <div>
  <div>
    
    <div className="flex shadow-lg rounded-t-3xl  flex-row sm:flex-row justify-between p-3 bg-white">
      
      <h1 className='text-xl px-3 mt-2'>Products</h1>
      
      
        <button className="px-2 py-1 sm:px-4  sm:py-2 flex font-semibold text-white bg-cyan-500 hover:bg-sky-800 focus:ring focus:ring-blue-300 rounded-lg focus:outline-none"
        onClick={() => navigate(`/products/addProduct`)}
        >
          <AiOutlineUserAdd className="w-6 h-6 mr-1" />
          Add Product
        </button>
    </div>
  </div> 

        <div className="table-container shadow-lg max-w-full overflow-x-auto ">
      <table className=" table w-full ">
        <thead className='border-y-2 '>
          <tr >
            <th className="bg-white pl-6 text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider pl-3">
            Image
            </th>
            <th className=" bg-white text-center text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            Name
            </th>
            <th className="bg-white text-center text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            SKU
            </th>
            <th className="bg-white text-center text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            Category
            </th>
            <th className="bg-white text-center text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            Subcategory
            </th>
            <th className="bg-white text-center text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            Quantity
            </th>
            <th className="bg-white text-center text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
            Status
            </th>
            <th className=" bg-white text-xs sm:text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              
            </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className=" py-4  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700"><img alt="product" src={product.productImage} className='w-26 h-24 rounded-lg'></img></td>
                <td className=" py-2  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700">{product.productName}</td>
                <td className=" py-2  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700">{product.sku}</td>
                <td className=" py-2  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700">{product.categoryName}</td>
                <td className=" py-2  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700">{product.subcategoryName}</td>
                <td className=" py-2  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700">{product.quantity}</td>
                <td className=" py-2  whitespace-no-wrap text-center text-xs sm:text-sm text-gray-700">
                {product.active ? (
                    <span className="capitalize py-1 px-2 rounded-md text-xs text-cyan-600 bg-sky-100" >Availble</span>
                    ) : (
                    <span className="capitalize py-1 px-2 rounded-md text-xs text-red-600 bg-red-100 " >out of stock</span>
                  )}
                
                </td>
                <td className=" py-2  whitespace-no-wrap text-xs sm:text-sm text-gray-700 ">
                    <Menu as="div" className="relative px-4">
        <div>
          <Menu.Button className="ml-2 mt-2 rounded-full focus:outline-none text-neutral-200  hover:text-black-500">
            
              <RiMoreLine className='w-9 h-9 text-neutral-400'/>
            
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')}
                  onClick={() => {setOpenDetails(true); setSelectedProduct(product)}}  >
                  <TbListDetails className='flex mt-1 w-6 h-6  p-1 mb-1'/>
                  details
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')}  onClick={() => navigate(`/products/edit/${product._id}`)} >
                  <FiEdit className='flex mt-1 w-6 h-6  p-1 mb-1'/>
                  Edit
                </div>
                
                
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(
                  active && 'bg-gray-100','px-3 flex items-center text-base text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2 ')} onClick={() => {
                    setOpenDelete(true);
                    setSelectedProduct(product);
                  }} >
                  <BsTrash className='flex mt-1 w-6 h-6  p-1 pb-1 mb-1'/>
                  Delete
                </div>
                
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
        
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex  justify-end  flex-col md:flex-row   w-full '>
      
        </div>
      </div>
      
    {openDelete && 
    <PopUp>
      <ProductDelete selectedProduct={selectedProduct} setOpenDelete={setOpenDelete} setSelectedProduct={setSelectedProduct} 
      setProducts={setProducts}/>
    </PopUp>}

    {openDetails && 
    <PopUp>
      <ProductDetails selectedProduct={selectedProduct} setOpenDetails={setOpenDetails} />
    </PopUp>}
    
    </div>
    
  );
}



