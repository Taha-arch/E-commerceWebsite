import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { fetchProductDetailsById } from '../../redux/slicers/products/productSlice';

export default function ProductDetails(props) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { selectedProduct, setOpenDetails } = props;
  const dispatch = useDispatch(); 
  
  const productDetails = useSelector((state) =>  state.productDetails);
  console.log(productDetails , " product details")
  useEffect(() => {
    if (selectedProduct) {
      const id = selectedProduct._id;
      setLoading(true);
      dispatch(fetchProductDetailsById(id))
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching product details:', error);
        });
    }
  }, [selectedProduct, dispatch]);
  
  console.log(productDetails , " product details")
  return (

  <div className="popup-details rounded-md overflow-y-auto h-1/3 mx-auto px-4 py-2 bg-white shadow-md  mt-3">
    <button className="close-detail bg-red-500 text-white p-1 px-2 mt-1 rounded-sm hover:bg-red-600" onClick={()=>setOpenDetails(false)} >X</button>
    <div className=" py-2">
    <div className="flex mr-8 pr-20">
        <h2 className='text-xl text-center product-title-details text-cyan-500'>Product Details</h2>
      </div>
    </div>
    <div className="bodyPopup pt-2 ml-2">
    {loading ? (
          <div>Loading...</div>
        ) : (
        <div className="container flex gap-3">
          <div className="w-5/5 h-5/5 image-product">
          <div className="pt-4">
          <img className="" src={productDetails && productDetails.productImage} alt="product_image"></img>
        </div>
          </div>
        <table className='productDetails '>
        <tr className=''>
            <td className='item-detail '>Product:</td>
            <td>{productDetails && productDetails.productName}</td>
            <td className=''></td>
            <td className='item-detail w-1/4 '>Sku:</td>
            <td className=''>{productDetails && productDetails.sku}</td>
           
        </tr>
        <tr>
            <td className='item-detail pr-2'>Category:</td>
            <td>{productDetails && productDetails.categoryName}</td>
            <td className=''></td>
            <td  className='item-detail '>Subcategory:</td>
            <td>{productDetails && productDetails.subcategoryName}</td>
        </tr>

        <tr>
            <td className='item-detail'>Price : </td>
            <td>{productDetails && productDetails.price}</td>
            <td className=''></td>
            <td className='item-detail'>Discount Price: </td>
            <td> {productDetails && productDetails.discountPrice}</td>
        </tr>

        <tr>
            <td className='item-detail'>Quantity: </td>
            <td>{productDetails && productDetails.quantity}</td>
            <td className=''></td>
            <td className='item-detail'>Active: </td>
            <td>{productDetails && productDetails.active ? 'true' : 'false'}</td>
        </tr>

        <tr>
            <td  colSpan={2} className='item-detail '>Short Description:</td>
            
            <td colSpan={3} > {productDetails && productDetails.shortDescription}</td>
        </tr>
        <tr>
            <td  colSpan={2} className='item-detail pb-16 pr-4 '>Long Description:</td>
            
            <td colSpan={3} className='p-1'> {productDetails && productDetails.longDescription}</td>
        </tr>
 
    </table>
        </div>
  )}
  {/* Handle case where productDetails is not available */}
  {!productDetails && !loading && <div>No product details available</div>}
    </div>

  </div>

);
}


  
