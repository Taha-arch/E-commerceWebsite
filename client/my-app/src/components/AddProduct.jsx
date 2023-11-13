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

  const handleFileChange = (event) => {
    fileInputRef.current.click();
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProductInfo({
          ...productInfo,
          productImage: reader.result,
          
        });
        
      };
      reader.readAsDataURL(file);
    }
  };

 
  const fileInputRef = React.createRef();
return (
  
  <div className="max-w-xl  mx-auto mt-6 p-4 bg-white shadow-md  h-full">
    <h1 className='text-xl ml-4'>Add Product</h1>
    <div className="p-4 overflow-auto h-[500px]">
      <form action="POST" onSubmit={handleSubmitAddProduct} encType="multipart/form-data">
  <p className="text-gray-900 mb-4">Please make sure all information is correct before submitting them.</p>
  <table className="w-full">
    <tbody>
      <tr>
        <td className="w-1/4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="productName">
            Name
          </label>
        </td>
        <td className="w-3/4">
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
            type="text"
            name="productName"
            id="productName"
            placeholder={productInfo && productInfo.productName}
            value={productInfo.productName}
            onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
            required
          />
        </td>
      </tr>
      <tr>
        <td>
          <label className="block text-gray-700 text-sm mb-2" htmlFor="sku">
            SKU
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
            type="text"
            name="sku"
            id="sku"
            placeholder={productInfo && productInfo.sku}
            value={productInfo.sku}
            onChange={(e) => setProductInfo({ ...productInfo, sku: e.target.value })}
            required
          />
        </td>
      </tr>
      <tr>
        <td>
          <label className="block text-gray-700 text-sm mb-2" htmlFor="price">
            Price
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-200"
            type="text"
            name="price"
            id="price"
            placeholder={productInfo && productInfo.price}
            value={productInfo.price}
            onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
            required
          />
        </td>
      </tr>
      <tr>
        <td>
          <label className="block text-gray-700 text-sm mb-2" htmlFor="discount_price">
            Discount
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
            type="text"
            name="discount_price"
            id="discount_price"
            placeholder={productInfo && productInfo.discount_price}
            value={productInfo.discount_price}
            onChange={(e) => setProductInfo({ ...productInfo, discount_price: e.target.value })}
            required
          />
        </td>
      </tr>
      <tr>
  <td>
    <label className="block text-gray-700 text-sm mb-2" htmlFor="subcategory_id">
      Subcategory Name
    </label>
  </td>
  <td>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="text"
      name="subcategory_id"
      id="subcategory_id"
      placeholder={productInfo && productInfo.subcategory_id}
      value={productInfo.subcategory_id}
      onChange={(e) => setProductInfo({ ...productInfo, subcategory_id: e.target.value })}
      required
    />
  </td>
</tr>
<tr>
  <td>
    <label className="block text-gray-700 text-sm mb-2" htmlFor="active">
      Active
    </label>
  </td>
  <td>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="text"
      name="active"
      id="active"
      placeholder={productInfo && productInfo.active}
      value={productInfo.active}
      onChange={(e) => setProductInfo({ ...productInfo, active: e.target.value })}
      required
    />
  </td>
</tr>

<tr>
  <td>
    <label className="block text-gray-700 text-sm mb-2" htmlFor="short_description">
      Short Description
    </label>
  </td>
  <td>
    <textarea
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="textarea"
      name="short_description"
      id="short_description"
      placeholder={productInfo && productInfo.short_description}
      value={productInfo.short_description}
      onChange={(e) => setProductInfo({ ...productInfo, shortDescription: e.target.value })}
      required
    />
  </td>
</tr>

<tr>
  <td>
    <label className="block text-gray-700 text-sm mb-2" htmlFor="long_description">
      Long Description
    </label>
  </td>
  <td>
    <textarea
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="text"
      name="long_description"
      id="long_description"
      placeholder={productInfo.long_Description}
      value={productInfo.long_description}
      onChange={(e) => setProductInfo({ ...productInfo, long_description: e.target.value })}
      required
    />
  </td>
</tr>

<tr>
  <td>
    <label className="block text-gray-700 text-sm mb-2" htmlFor="quantity">
      Quantity
    </label>
  </td>
  <td>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="text"
      name="quantity"
      id="quantity"
      placeholder={productInfo && productInfo.quantity}
      value={productInfo.quantity}
      onChange={(e) => setProductInfo({ ...productInfo, quantity: e.target.value })}
      required
    />
  </td>
</tr>

<tr>
  <td>
    <label className="block text-gray-700 text-sm mb-2" htmlFor="productImage">
      Image
    </label>
  </td>
  <td>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="file"
      name="productImage"
      id="productImage"
      ref={fileInputRef}
      onChange={handleFileChange}
      required
    />
  </td>
</tr>

    </tbody>
  </table>

  <div className="flex justify-end gap-2 mt-4">
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
      onClick={() => handleSubmitAddProduct}
    >
      Save
    </button>
  </div>
  <ToastContainer/>
  </form>
</div>
  </div>
);
}


  
