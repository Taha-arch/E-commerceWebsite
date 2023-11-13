import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function ProductDetails() {
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    productImage: '',
    sku: '',
    productName: '',
    shortDescription: '',
    longDescription: '',
    price: '',
    discount_price: '',
    quantity: '',
    active: '',
    subcategory_id: ''
  });

const { id } = useParams();
  useEffect(() => {
      const fetchProductDetails = async () => {
        try {
            fetch(`http://localhost:3001/products/${id}`)
            .then(response => response.json())
            .then( res => setProductInfo(res.data));
            
        } catch (error) {
          console.log(error);
        }
      };
      fetchProductDetails();
  }, [id]);

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
        discount_price: productInfo.discount_price,
        quantity: productInfo.quantity,
        subcategory_id: productInfo.subcategory_id
      });
      notify();

      console.log(response.data);

    } catch (error) {
      console.error('Error Editing product:', error);
    }
  };
  
return (
  
  <div className="p-4 ml-10 overflow-auto h-[500px] bg-white rounded-t-3xl rounded-lg" style={{width:'92%'}}>
    
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
            className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
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
            className="w-full px-3 py-2  border rounded-lg focus:outline-none focus:border-green-300"
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
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="discount_price">
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
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="subcategory_id">
            Subcategory Name
          </label>
        </td>
        <td>
        <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="text"
      name="subcategory_id"
      id="subcategory_id"
      placeholder={productInfo && productInfo.subcategoryName}
      value={productInfo.subcategoryName}
      onChange={(e) => setProductInfo({ ...productInfo, subcategoryName: e.target.value })}
      required
    />
        </td>
        <td>
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="active">
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
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="short_description">
            Short Description
          </label>
        </td>
        <td>
        <textarea
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
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
          <label className="block font-bold text-gray-700 text-sm mb-2 pl-8" htmlFor="long_description">
            Long Description
          </label>
        </td>
        <td colSpan="3">
        <textarea
      className="px-3 py-5 h-3/4 w-full border rounded-lg focus:border"
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
    <img alt="the-current-product_image" src={productInfo && productInfo.productImage} className='w-1/5'></img>
     </td>
        <td>
          edit icon
        {/* <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-300"
      type="file"
      name="productImage"
      id="productImage"
      onChange={(e) => setProductInfo({ ...productInfo, productImage: e.target.files[0] })}
      required
    /> */}
        </td>
      </tr>

    </tbody>
  </table>
  <div className="flex justify-end gap-2 mt-4">
  <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-green-300"
          type="button"
          onClick={() => navigate(`/products`)}
        >
          Cancel
    </button>

    <button
      className="bg-cyan-500 text-white py-2 px-4 mr-6 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-green-300"
      type="button"
      onClick={() => handleSubmitEditProduct()}
    >
      Save
    </button>
  </div>

</div>
  );
}
