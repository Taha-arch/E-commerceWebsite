import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FaArrowDown } from "react-icons/fa";
import PopUp from '../PopUp';
import { useParams } from 'react-router-dom';
import AddCategory from '../Category/AddCategory';
import AddSubcategory from '../Subcatgory/AddSubcategory'
import { RiEdit2Fill } from 'react-icons/ri';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function ProductEdit() {

  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
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
    shortDescription: '',
    longDescription: '',
    price: '',
    discountPrice: '',
    quantity: '',
    subcategory_id: '',
    option: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  function openList() {
    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
  
    if (openBtn.style.display === 'block') {
      openBtn.style.display = 'none';
      closeBtn.style.display = 'block';
    } else {
      openBtn.style.display = 'block';
      closeBtn.style.display = 'none';
    }
  }

  const handleDivClick = (index) => {
    const fileInput = document.getElementById(`fileInput_${index}`);
    if (fileInput) {
      fileInput.click();
    }
  };
  
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...productInfo.productImage];
        updatedImages[index] = reader.result;
        setProductInfo({
          ...productInfo,
          productImage: updatedImages,
        });
      };
      reader.readAsDataURL(file);
    }
  };  
  
  const fileInputRef = React.createRef();

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
  }, [category]); 

    
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const config = {
        headers: { Authorization: `Bearer ${token}`}
      };
  
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`, config);
        const productData = response.data.data;
        setProductInfo(productData);
        setCategory(productData.categoryName || '');
        setSubcategory(productData.subcategoryName || '');
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProductDetails();
  }, [id, token]);


  const notify = () => swal(
    {
      title: 'Product edited successfully',
      icon: 'success',
      button: 'close',
      className: 'alert',
    }
  );

  const handleSubmitEditProduct = async () => {
  
    try {
        const response = await axios.patch(`http://localhost:3001/products/${id}`,  {
          product_name : productInfo.productName,
          product_image : productInfo.productImage,
          sku: productInfo.sku,
          short_description: productInfo.shortDescription,
          long_description: productInfo.longDescription,
          price: productInfo.price,
          active: productInfo.active,
          discount_price: productInfo.discountPrice,
          quantity: productInfo.quantity,
          subcategory_id: productInfo.subcategory_id
      });
      notify();
      
      console.log(response.data);

    } catch (error) {
      console.error('Error Editing product:', error);
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
    
  <p className="titleAdd-product text-cyan-500 mb-4 text-2xl font-bold">Edit Product</p>
  
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
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:border"
            type="text"
            name="productName"
            id="productName"
            placeholder={productInfo && productInfo.productName}
            value={productInfo.productName}
            onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
            required
          />
          
        </td>
        
        <td className='w-1/4'>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="sku">
            SKU
          </label>
        </td>
        <td className=" ">
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:border"
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
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="price">
            Price
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:border"
            type="text"
            name="price"
            id="price"
            placeholder={productInfo && productInfo.price}
            value={productInfo.price}
            onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
            required
          />
          
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="discount_price">
            Discount
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:border"
            type="text"
            name="discount_price"
            id="discount_price"
            placeholder={productInfo && productInfo.discountPrice}
            value={productInfo.discountPrice}
            onChange={(e) => setProductInfo({ ...productInfo, discountPrice: e.target.value })}
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
        
  <div className='drop-down' >
  <span className="absolute mt-1 ml-2" id="category-value" >{category}</span>
          <div id="offButton" className="border rounded-lg focus:border hidden h-8 w-4r" onClick={off}>
          <IoIosArrowUp className='relative right-5 pt-1 text-2xl' />
          </div>
          <div id="showButton" className="border border-gray-600 rounded-lg focus:border h-8 w-full  z-10" onClick={show}>
          <IoIosArrowDown className='relative right-5 pt-1 text-2xl' />
          </div>

        <ul className='hide-list category-items  overflow-y-auto h-24' id="list" >
        {categories && categories.map((item) => (
      
        <li key={item._id} name={item.category_name} className="cursor-pointer"
          onClick={()=>{
            setCategory(item.category_name);
          }}>{item.category_name}</li>
            ))}
          <li className="item add-item text-cyan-500"><button onClick={() => setOpenCategory(true)}>Add category</button></li>
        </ul>
</div>

        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="subcategoryName">
            Subcategory
          </label>
        </td>
        <td>
        <div className=''>
        <span className="absolute mt-1 ml-2" id="category-value" >{subcategory}</span>
          <div id="offSubButton" className="border border-gray-600 rounded-lg focus:border hidden h-8 w-4r" onClick={offSubCategory}>
          <IoIosArrowUp className='relative left-44 pt-1 text-2xl' />
          </div>
          <div id="showSubButton" className="border rounded-lg border-gray-600 focus:border h-8 w-full  " onClick={showSubCategory}>
          <IoIosArrowDown className='relative left-64 pt-1 text-2xl' />
          </div>
        <ul className='category-items  overflow-y-auto' id="subList">
        {subCategories && subCategories.map((item) => (
        <li key={item._id} name={item.subcategory_name} className="cursor-pointer " 
        onClick={()=>{setSubcategory(item.subcategory_name)
          setProductInfo({ ...productInfo, subcategory_id: item._id })
          }}>{item.subcategory_name}</li>
            ))}
          {category && <li className="item add-item text-cyan-500"><button onClick={() => setOpenSubcategory(true)}>Add subcategory</button></li>}
        </ul>
</div>

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
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:border"
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
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:border"
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
            className="w-full  px-3 py-2  border border-gray-600 rounded-lg"
            type="textarea"
            name="short_description"
            id="short_description"
            placeholder={productInfo && productInfo.shortDescription}
            value={productInfo.shortDescription}
            onChange={(e) => setProductInfo({ ...productInfo, shortDescription: e.target.value })}
            required
          />
        
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="quantity">
            Quantity
          </label>
        </td>
        <td>
          <input
            className="w-full px-3 py-2 border rounded-lg border-gray-600 focus:border"
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
            className="px-3 py-2 h-3/4 w-full border border-gray-600 rounded-lg focus:border"
            type="text"
            name="long_description"
            id="long_description"
            placeholder={productInfo.longDescription}
            value={productInfo.longDescription}
            onChange={(e) => setProductInfo({ ...productInfo, longDescription: e.target.value })}
            required
          />
        </td>
      </tr>        
    
        <tr>
          <td>
            <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="productImage">
              Image
            </label>
          </td>
          <td colSpan={3}>
          <div className='flex py-2 '>

          {productInfo.productImage && productInfo.productImage.map((product, index) => (
        
        <div className='profile flex justify-center mx-2 ' key={index}>
        <label htmlFor={`fileInput_${index}`} className='flex second-col product-img bg-no-repeat bg-cover' 
        style={{ backgroundImage: `url(${product})`, cursor: 'pointer' }} onClick={() => handleDivClick(index)}>
        </label>
        <RiEdit2Fill className="icon text-white w-5 h-5 cursor-pointer" onClick={() => handleDivClick(index)}/>
        <input
          type="file"
          name={`productImage_${index}`}
          id={`fileInput_${index}`}
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e, index)}
        />
      </div>
      
     ))}
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
      onClick={() => handleSubmitEditProduct()}
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