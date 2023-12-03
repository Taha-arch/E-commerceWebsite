import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import PopUp from '../PopUp';
import AddCategory from '../Category/AddCategory';
import AddSubcategory from '../Subcatgory/AddSubcategory'
import { FaArrowAltCircleDown } from "react-icons/fa";

import { FaArrowAltCircleUp } from "react-icons/fa";

export default function AddProduct() {

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const [errors, setErrors] = useState({});
  const [subCategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [OpenCategory, setOpenCategory] = useState(false);
  const [OpenSubcategory, setOpenSubcategory] = useState(false);
  const [subcategory, setSubcategory] = useState('');
  const [category, setCategory] = useState('');
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
    option: '',
  });

  const fetchSubCategoryData = async () => {  
    try{
      const response = await axios.get('http://localhost:3001/subcategories/');
      return response.data.subcategories;
    }catch(error){
      console.log("Error fetching subcategory data: ", error); 
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setSubcategory('');
        const subCategoryData = await fetchSubCategoryData();
        const filtered = subCategoryData.filter(
          (subCategory) => subCategory.category_id.category_name === category
        );
        
        setSubcategories(filtered)
      } catch (error) {
        console.log("Error in useEffect subCategory: ", error); 
      }
    }
    fetchData();
  }, [category]);
  


  const fetchCategoryData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories/');
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching category data:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchCategoryData();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, []); 


  const notify = () => swal(
    {
      title: 'Product added successfully',
      icon: 'success',
      button: 'close',
      className: 'alert',
    }
  );

  const validateForm = () => {
    const newErrors = {};

    if (!productInfo.productName) {
      newErrors.productName = 'Name is required';
    }

    if (!productInfo.sku) {
      newErrors.sku = 'SKU is required';
    }
    if (!productInfo.long_description) {
      newErrors.long_description = 'Long description is required';
    }

    if (!productInfo.price) {
      newErrors.price = 'Price is required';
    }

    if (!productInfo.short_description) {
      newErrors.short_description = 'Short description is required';
    }
 
    if (!productInfo.productImage) {
      newErrors.productImage = 'Image is required';
    }
    if (!category) {
      newErrors.categoryName = 'Category is required';
    }
    if (!subcategory) {
      newErrors.subcategoryName = 'Subcategory is required';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAddProduct = async () => {
    if (validateForm()) {
    const formData = new FormData();
    formData.append('product_name', productInfo.productName);
    for (let i = 0; i < productInfo.productImage.length; i++) {
      formData.append('product_image', productInfo.productImage[i]);
    }
    formData.append('sku', productInfo.sku);
    formData.append('short_description', productInfo.short_description);
    formData.append('long_description', productInfo.long_description);
    formData.append('price', productInfo.price);
    formData.append('discount_price', productInfo.discount_price);
    formData.append('quantity', productInfo.quantity);
    formData.append('subcategory_id', productInfo.subcategory_id);
    formData.append('option', productInfo.option);
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}`}
      }
      const response = await axios.post('http://localhost:3001/products', formData, config);
  
      console.log(response.data);
      notify();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }else{
    console.log("validation error")
  }
  };

  function show() {
    var elem = document.getElementById('list');
    var showButton = document.getElementById('showButton');
    var offButton = document.getElementById('offButton');
    elem.style.display = 'block'; 
    showButton.style.display = 'none';
    offButton.style.display = 'block';
  }

  function off() {
    var elem = document.getElementById('list');
    elem.style.display = 'none'; 
    var offButton = document.getElementById('offButton');
    var showButton = document.getElementById('showButton');
    offButton.style.display = 'none';
    showButton.style.display = 'block';
  }
  function showSubCategory() {
    var elem = document.getElementById('subList');
    var showButton = document.getElementById('showSubButton');
    var offButton = document.getElementById('offSubButton');
    elem.style.display = 'block'; 
    showButton.style.display = 'none';
    offButton.style.display = 'block';
  }

  function offSubCategory() {
    var elem = document.getElementById('subList');
    elem.style.display = 'none'; 
    var offButton = document.getElementById('offSubButton');
    var showButton = document.getElementById('showSubButton');
    offButton.style.display = 'none';
    showButton.style.display = 'block';
  }
return (
  
  <div className="p-4 ml-10 overflow-auto h-full bg-white rounded-t-3xl rounded-lg" style={{width:'92%'}}>
    
  <p className="titleAdd-product text-cyan-500 mb-4 text-2xl font-bold">Add Product</p>
  
  <p className="sub-titleAdd-product text-gray-900 mb-4 ">Please make sure all information is correct before submitting them.</p>
  <table className="w-4/4">
    <tbody>
      <tr>
        <td className="w-1/4">
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="productName">
            Name
          </label>
        </td>
        <td className="w-1/4">
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
            type="text"
            name="productName"
            id="productName"
            placeholder={productInfo && productInfo.productName}
            value={productInfo.productName}
            onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
            required
          />
            {errors.productName && <div className="text-red-500">{errors.productName}</div>}
        </td>
        
        <td className='w-1/4'>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="sku">
            SKU
          </label>
        </td>
        <td className=" ">
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
            type="text"
            name="sku"
            id="sku"
            placeholder={productInfo && productInfo.sku}
            value={productInfo.sku}
            onChange={(e) => setProductInfo({ ...productInfo, sku: e.target.value })}
            required
          />
           {errors.sku && <div className="text-red-500">{errors.sku}</div>}
        </td>
      </tr>
      
      <tr>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="price">
            Price
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
            type="text"
            name="price"
            id="price"
            placeholder={productInfo && productInfo.price}
            value={productInfo.price}
            onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
            required
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="discount_price">
            Discount
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
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
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="subcategory_id">
            Category
          </label>
        </td>
        <td>

  <div className=''>
        <span className="absolute mt-1 ml-2" id="category-value" >{category}</span>
          <div id="offButton" className="border rounded-lg focus:border hidden h-8 w-4r" onClick={off}>
          <FaArrowAltCircleUp className='mt-2 '/>
          </div>
          <div id="showButton" className="border rounded-lg focus:border h-8 w-full  z-10" onClick={show}>
          <FaArrowAltCircleDown className='mt-2 '/>
          </div>
        <ul className='category-items h-24 overflow-y-auto' id="list">
        {categories && categories.map((item) => (
          
          <li key={item._id} name={item.category_name} className="cursor-pointer " onClick={()=>{setCategory(item.category_name)}}>{item.category_name}</li>
          ))}
          <li className="item add-item text-cyan-500"><button onClick={() => setOpenCategory(true)}>Add category</button></li>
        </ul>
</div>

          {errors.categoryName && <div className="text-red-500">{errors.categoryName}</div>}
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="subcategoryName">
            Subcategory
          </label>
        </td>
        <td>
        <div className=''>
        <span className="absolute mt-1 ml-2" id="category-value" >{subcategory}</span>
          <div id="offSubButton" className="border rounded-lg focus:border hidden h-8 w-4r" onClick={offSubCategory}>
          <FaArrowAltCircleUp className='mt-2 ml-44'/>
          </div>
          <div id="showSubButton" className="border rounded-lg focus:border h-8 w-full  " onClick={showSubCategory}>
          <FaArrowAltCircleDown className='mt-2 ml-44'/>
          </div>
        <ul className='category-items overflow-y-auto' id="subList">
          
        {subCategories && subCategories.map((item) => (
        <li key={item._id} name={item.subcategory_name} className="cursor-pointer " 
        onClick={()=>{setSubcategory(item.subcategory_name)
          setProductInfo({ ...productInfo, subcategory_id: item._id })}}>{item.subcategory_name}</li>
            ))}
          {category && <li className="item add-item text-cyan-500"><button onClick={() => setOpenSubcategory(true)}>Add subcategory</button></li>}
        </ul>
</div>
{errors.subcategoryName && <div className="text-red-500">{errors.subcategoryName}</div>}
        </td>
      </tr>
       <tr>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="active">
            Active
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
            type="text"
            name="active"
            id="active"
            placeholder={productInfo && productInfo.active}
            value={productInfo.active}
            onChange={(e) => setProductInfo({ ...productInfo, active: e.target.value })}
            required
          />
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="option">
            Options
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
            type="text"
            name="option"
            id="option"
            placeholder={productInfo && productInfo.option}
            value={productInfo.option}
            onChange={(e) => setProductInfo({ ...productInfo, option: e.target.value })}
            required
          />
          </td>
       </tr>
      <tr>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="short_description">
            Short Description
          </label>
        </td>
        <td>
          <textarea
            className="w-full  px-3 py-2  border rounded-lg "
            type="textarea"
            name="short_description"
            id="short_description"
            placeholder={productInfo && productInfo.short_description}
            value={productInfo.short_Description}
            onChange={(e) => setProductInfo({ ...productInfo, short_description: e.target.value })}
            required
          />
          {errors.short_description && <div className="text-red-500">{errors.short_description}</div>}
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="quantity">
            Quantity
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:border"
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
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="long_description">
            Long Description
          </label>
        </td>
        <td colSpan="3">
          <textarea
            className="px-3 py-2 h-3/4 w-full border rounded-lg focus:border"
            type="text"
            name="long_description"
            id="long_description"
            placeholder={productInfo.long_description}
            value={productInfo.long_description}
            onChange={(e) => setProductInfo({ ...productInfo, long_description: e.target.value })}
            required
          />
           {errors.long_description && <div className="text-red-500">{errors.long_description}</div>}
        </td>
      </tr>

      <tr>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="productImage">
            Image
          </label>
        </td>
        <td colSpan="3">
        
    {errors.productImage && <div className="text-red-500">{errors.productImage}</div>}
    <div class="flex  mt-8">
    <div class="w-full rounded-lg  bg-gray-50">
        <div class=" m-4">
            <label class="inline-block mb-2 text-gray-500">Image Upload</label>
            <div class="flex items-center justify-center w-full">
                <label class="flex flex-col w-full h-28 border-4 border-blue-950 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div class="upload-box flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Attach an image</p>
                    </div>

                    <input type="file" class="opacity-0" 
                    name="product_image"
                    id="productImage"
                    multiple
                    onChange={(e) => setProductInfo({ ...productInfo, productImage: e.target.files })}
                    required/>
                 
                </label>
                <span></span>
            </div>
            
        </div>
    </div>
      </div> 
        </td>
      </tr>

     
    </tbody>
  </table>
  <div className="flex justify-end gap-2 mt-4">
    <button
      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 "
      type="button"
      onClick={() => navigate(`/products`)}
    >
      Cancel
    </button>

    <button
      className="bg-cyan-500 text-white py-2 px-4 mr-6 rounded-lg hover:bg-cyan-600 "
      type="button"
      onClick={() => handleSubmitAddProduct()}
    >
      Save
    </button>
  </div>
 {OpenCategory && 
 <PopUp>
  <AddCategory setOpenCategory={setOpenCategory} setCategory={setCategory} />
  </PopUp>}

  {OpenSubcategory && 
 <PopUp>
  <AddSubcategory setOpenSubcategory={setOpenSubcategory} setSubcategory={setSubcategory} category={category} />
  </PopUp>}
</div>

);
}


  