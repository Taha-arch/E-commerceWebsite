import React, { useState, useEffect } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { BsBoxArrowDownRight } from 'react-icons/bs';
import { LuListFilter } from 'react-icons/lu';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { FaUsersLine } from 'react-icons/fa6';
import Modal from './Modal';
import AddProduct from './AddProduct';
import PopUp from './PopUp';
import axios from 'axios';
import ProductDetails from './ProductDetails';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const titre = "product";

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

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        const product_id = selectedProduct._id;
        await axios.delete(`http://localhost:3001/products/${product_id}`);
        
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== product_id)
        );
        setSelectedProduct(null);
        setOpenModal(false);
      } catch (error) {
        console.error('Error deleting product data:', error);
      }
    }
  };




  const handleSubmitAddProduct = async () => {
    
  }

  return (
    <div className="overflow-scroll overflow-x-auto" style={{ width: '100%' }}>
      <div className="flex justify-center p-3 bg-white py-8">
        <FaUsersLine className="m-1 text-4xl" />
        <h1 className="text-4xl font-bold">Products</h1>
      </div>

      <div className="flex justify-between p-3 bg-white">
        <button className="px-4 py-2 flex text-base text-white bg-gray-500 rounded-lg hover-text-white focus:outline-none">
          <LuListFilter className="w-4 h-6 mr-1" />
          Filter
        </button>

        <button className="px-4 py-2 flex text-base text-white bg-lightgreen rounded-lg bg-green-600 hover:bg-green-300 focus:outline-none"
        onClick={() => {
          setOpenPopUp(true);
          
        }}>
          <AiOutlineUserAdd className="w-6 h-6 mr-1" />
          
          Add Product
        </button>
      </div>

      <div className="h-80 overflow-auto">
        <table className="table-auto w-full">
          <thead className="sticky top-0">
            <tr>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Product name
              </th>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                SKU
              </th>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-center py-3 bg-gray-100 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="overflow-auto bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">
                  <img alt="product" src={product.productImage}></img>
                </td>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-gray-700">
                  {product.productName}
                </td>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 text-blue-500">{product.sku}</td>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 ">{product.categoryName}</td>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 ">{product.quantity}</td>
                <td className="text-center py-2 whitespace-no-wrap text-sm leading-5 ">
                  {product.active ? (
                    <GrStatusGoodSmall className="inline-flex mr-2 text-lightgreen" />
                  ) : (
                    <GrStatusGoodSmall className="inline-flex mr-2 text-red-500" />
                  )}
                </td>
                <td className="text-center py-4 whitespace-no-wrap text-sm leading-5 justify-center flex space-x-3 mt-10">
                  <button className="px-2 py-1 flex text-base justify-center text-white bg-yellow-500 rounded-lg hover-text-white focus:outline-none"
                  onClick={() => {
                    
                    setSelectedProduct(product);
                    setOpenDetail(true);
                    

                  }}>

                    <BsBoxArrowDownRight className="w-4 h-6 mr-1" />
                    Details
                  </button>
                  <button className="px-2 py-1 flex text-base justify-center text-white bg-blue-500 rounded-lg hover-text-white focus:outline-none"
                  onClick={()=>{
                    
                  }}
                  >
                    <FiEdit3 className="w-4 h-6 mr-1" />
                    Edit
                  </button>
                  <button
                    
                    className="px-2 py-1 flex text-base justify-center text-white bg-red-500 rounded-lg hover-text-white focus:outline-none"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedProduct(product);
                      console.log(selectedProduct);
                    }}
                  >
                    <BsTrash className="w-4 h-6 mr-1" />
                    Delete
                  </button >
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      {openPopUp && (
  <PopUp Title="Add new product">
    <AddProduct  setOpenPopUp={setOpenPopUp} handleSubmitAddProduct={handleSubmitAddProduct} />
  </PopUp>
  )}
  
  {openDetail && (
  <PopUp >
    <ProductDetails  setOpenDetail={setOpenDetail} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}  />
  </PopUp>
  )}
    {openModal && <Modal closeModal={setOpenModal} onDelete={handleDeleteProduct} Title={titre}/>}
    
    </div>
  );
}

