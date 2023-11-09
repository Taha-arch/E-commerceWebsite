import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function ProductDetails(props) {
  const {setOpenEdit, selectedProduct, setSelectedProduct} = props;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      const fetchProductDetails = async () => {
        try {
            const product_id = selectedProduct._id;
            fetch(`http://localhost:3001/products/${product_id}`)
            .then(response => response.json())
            .then( res => setProduct(res.data));
        } catch (error) {
          console.log(error);
        }
      };

      fetchProductDetails();
    }
  }, [selectedProduct]);

  const [productInfo, setProductInfo] = useState({
    productImage: '',
    sku: '',
    productName: '',
    short_description: '',
    long_description: '',
    price: '',
    discount_price: '',
    quantity: '',
    active: '',
    subcategory_id: '',
    
  });

  const handleSubmitEditProduct = async () => {
  
    const formData = new FormData();
    formData.append('product_name', productInfo.productName);
    formData.append('product_image', productInfo.productImage);
    formData.append('sku', productInfo.sku);
    formData.append('short_description', productInfo.short_description);
    formData.append('long_description', productInfo.long_description);
    formData.append('price', productInfo.price);
    formData.append('discount_price', productInfo.discount_price);
    formData.append('quantity', productInfo.quantity);
    formData.append('active', productInfo.active);
    formData.append('subcategory_id', productInfo.subcategory_id);
  
    try {
      const product_id = selectedProduct._id;
      const response = await axios.patch(`http://localhost:3001/products/${product_id}`, formData);
      console.log(response.data);
      setSelectedProduct(null);
      setOpenEdit(false);
    } catch (error) {
      console.error('Error Editing product:', error);
    }
  };
  
return (
  
  <div className="max-w-4xl  mx-auto  p-4 bg-white shadow-md  h-full">
    
      <p className=" text-gray-900 mb-4 px-4">Please make sure all informations is correct before submitting them. </p>
      <form  onSubmit={handleSubmitEditProduct} encType="multipart/form-data">
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
          placeholder={product && product.productName}
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
          placeholder={product && product.sku}
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
          placeholder={product && product.price}
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
          placeholder={product && product.discount_price}
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
          placeholder={product && product.subcategoryName}
          value={productInfo.subcategory_id}
          onChange={(e) => setProductInfo({ ...productInfo, subcategory_id: e.target.value })}
          required
          />
          </div>

          <div className="row1 flex">
          <label className="block text-gray-700 text-sm  mb-2 ml-10 mr-4" htmlFor="subcategory_id">
          Active
          </label>
      <input
          className="w-9/12  px-3 ml-10  border rounded-lg  focus:outline-none focus:border-green-300"
          type="text"
          name="active"
          id="active"
          placeholder={product && product.active}
          value={productInfo.active}
          onChange={(e) => setProductInfo({ ...productInfo, active: e.target.value })}
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
          placeholder={product && product.shortDescription}
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
          placeholder={product && product.longDescription}
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
          placeholder={product && product.quantity}
          value={productInfo.quantity}
          onChange={(e) => setProductInfo({ ...productInfo, quantity: e.target.value })}
          required
          />
          </div>
          <div className="row2 flex"></div>
          <label className="block text-gray-700 text-sm  mb-2 ml-20 mr-6" htmlFor="productImage">
          Image
          </label>
          <div className='w-1/5'>
            <img src={product && product.productName} alt="product_image" />
          </div>
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
            onClick={() =>handleSubmitEditProduct()}>
            Save
          </button>
          <button
            className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-green-300"
            type="button"
            onClick={() => {
              setOpenEdit(false);
              setSelectedProduct(null);
              }}>
            Close
          </button>
        </div>
      </form>
      </div>
     
  );
}


  
