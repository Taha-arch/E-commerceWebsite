import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct(props) {
  const {setOpenPopUp } = props;
  
  const [productInfo, setProductInfo] = useState({
    productImage: '',
    sku: '',
    productName: '',
    short_description: '',
    long_description: '',
    price: '',
    discount_price: '',
    quantity: '',
    subcategory_id: '',
    
  });

  const notify = () => {
    toast.success('Product Added Successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  const handleSubmitAddProduct = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('product_name', productInfo.productName);
    formData.append('product_image', productInfo.productImage);
    formData.append('sku', productInfo.sku);
    formData.append('short_description', productInfo.short_description);
    formData.append('long_description', productInfo.long_description);
    formData.append('price', productInfo.price);
    formData.append('discount_price', productInfo.discount_price);
    formData.append('quantity', productInfo.quantity);
    formData.append('subcategory_id', productInfo.subcategory_id);
  
    try {
      const response = await axios.post('http://localhost:3001/products', formData);
  
      console.log(response.data);
      notify();
      setOpenPopUp(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  

return (
  
  <div className="max-w-4xl  mx-auto  p-4 bg-white shadow-md  h-full">
    
      <p className=" text-gray-900 mb-4 px-4">Please make sure all informations is correct before submitting them. </p>
      <form  onSubmit={handleSubmitAddProduct} encType="multipart/form-data">
      <div className="mb-4 flex ">
          <div className="row1 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-10 mr-4" htmlFor="productName">
          Name
          </label>
      <input
          className="w-9/12  px-3 ml-10  border rounded-lg  focus:outline-none focus:border-green-300"
          type="text"
          name="productName"
          id="productName"
          value={productInfo.productName}
          onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
          required
          />
          </div>
          <div className="row2 flex">
          <label className="block text-gray-700 text-sm  mb-2 mr-4 ml-20" htmlFor="sku">
          SKU
          </label>
          <input
          className="w-9/12  px-3 ml-12 placeholder-gray-300 border rounded-lg focus:outline-none  focus:border-green-300"
          type="text"
          name="sku"
          id="sku"
          value={productInfo.sku}
          onChange={(e) => setProductInfo({ ...productInfo, sku: e.target.value })}
          required
          />
          </div>
      </div>
      <div className="mb-4 flex">
          <div className="row1 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-10 mr-4" htmlFor="price">
          Price
          </label>
          <input
          className="w-9/12 px-3 ml-12 placeholder-gray-300 border rounded-lg focus:outline-none  focus:border-green-200"
          type="text"
          name="price"
          id="price"
          value={productInfo.price}
          onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
          required
          />
          </div>
          <div className="row2 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-20 mr-4" htmlFor="discount_price">
          Discount 
          </label>
          <input
          className="w-9/12 px-3 ml-4 placeholder-gray-300 border rounded-lg focus:outline-none  focus:border-green-300"
          type="text"
          name="discount_price"
          id="discount_price"
          value={productInfo.discount_price}
          onChange={(e) => setProductInfo({ ...productInfo, discount_price: e.target.value })}
          required
          />
      </div>
      </div>
  

      <div className="mb-4 flex ">
          <div className="row1 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-10 mr-4" htmlFor="subcategory_id">
          Subcatergory ID
          </label>
      <input
          className="w-9/12  px-3 ml-10  border rounded-lg  focus:outline-none focus:border-green-300"
          type="text"
          name="subcategory_id"
          id="subcategory_id"
          value={productInfo.subcategory_id}
          onChange={(e) => setProductInfo({ ...productInfo, subcategory_id: e.target.value })}
          required
          />
          </div>
         
      </div>


      <div className="mb-4 flex">
      <div className="row1 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-10" htmlFor="short_description">
          Short Description
          </label>
          <textarea
          className="w-9/12 px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none  focus:border-green-300"
          type="textarea"
          name="short_description"
          id="short_description"
          value={productInfo.short_description}
          onChange={(e) => setProductInfo({ ...productInfo, short_description: e.target.value })}
          required
          />
          </div>
          <div className="row2 flex">
          <label className="block text-gray-700 text-sm  mb-2 mr-4 ml-20" htmlFor="long_description">
          Long Description
          </label>
          <textarea
          className="w-9/12 px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none  focus:border-green-300"
          type="text"
          name="long_description"
          id="long_description"
          value={productInfo.long_description}
          onChange={(e) => setProductInfo({ ...productInfo, long_description: e.target.value })}
          required
          />
      </div>
      </div>

      <div className="mb-4 flex">
      <div className="row1 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-10" htmlFor="quantity">
          Quantity
          </label>
          <input
          className="w-9/12 px-3 py-2 ml-10 placeholder-gray-300 border rounded-lg focus:outline-none  focus:border-green-300"
          type="text"
          name="quantity"
          id="quantity"
          value={productInfo.quantity}
          onChange={(e) => setProductInfo({ ...productInfo, quantity: e.target.value })}
          required
          />
          </div>
          <div className="row2 flex"></div>
          <label className="block text-gray-700 text-sm  mb-2 ml-20 mr-6" htmlFor="productImage">
          Image
          </label>
          <input
              className="w-1/5 px-3 py-2 ml-8 placeholder-gray-300 border rounded-lg focus:outline-none focus:border-green-300"
              type="file"
              name="productImage"
              id="productImage"
              onChange={(e) => setProductInfo({ ...productInfo, productImage: e.target.files[0] })}
              required
            />

          </div>
      

      <div className="flex justify-end gap-2 py-4 pr-20">
        <button
          className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-green-300"
          type="button"
          onClick={() => {
            setOpenPopUp(false)}
          }
        >
          Cancel
        </button>

        <button
          className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-green-300"
          type="submit"
          onClick={handleSubmitAddProduct}
          
        >
          Save
        </button>
      </div>
    </form>
    <ToastContainer/>
  </div>
);
}


  
