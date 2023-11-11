import React, {useState, useEffect} from 'react';


export default function ProductDetails(props) {

  const [product, setProduct] = useState(null);
  const { selectedProduct, setOpenDetails } = props;

  useEffect(() => {
    const id = selectedProduct._id;
      const fetchProductDetails = async () => {
        try {
            fetch(`http://localhost:3001/products/${id}`)
            .then(response => response.json())
            .then( res => setProduct(res.data));
        } catch (error) {
          console.log(error);
        }
      };

      fetchProductDetails();
  }, []);

    return (

  <div className="popup-details rounded-md overflow-y-auto h-[500px] mx-auto px-4 py-2 bg-white shadow-md  mt-3 ">
    <button onClick={()=>setOpenDetails(false)} >X</button>
    <div className=" py-4">
    <div className="flex mr-8 pr-20">
        <h2 className='text-xl text-center product-title-details text-cyan-500'>Product Details</h2>
      </div>
    </div>
    <div className="bodyPopup pt-2 ml-2">
        <div className="container">
        <table className='productDetails'>
        <tr>
            <td className='font-bold'>Name</td>
            <td>: {product && product.productName}</td>
        </tr>
        <tr>
            <td>Sku</td>
            <td>: {product && product.sku}</td>
        </tr>
        <tr>
            <td>Category Name</td>
            <td>: {product && product.categoryName}</td>
        </tr>
        <tr>
            <td>Subcategory Name</td>
            <td>: {product && product.subcategoryName}</td>
        </tr>
        
        <tr>
            <td>Price</td>
            <td>: {product && product.price}</td>
        </tr>
        <tr>
            <td>Discount Price</td>
            <td>: {product && product.discountPrice}</td>
        </tr>
        <tr>
            <td>Quantity</td>
            <td>: {product && product.quantity}</td>
        </tr>
        <tr>
            <td>Active</td>
            <td>: {product && product.active ? 'true' : 'false'}</td>
        </tr>
        <tr>
            <td>Short Description</td>
            <td>: {product && product.shortDescription}</td>
        </tr>
        <tr>
            <td >Long Description</td>
            <td>: {product && product.longDescription}</td>
        </tr>
        <tr>
        <td>Image</td>
        <td  className=''>
        <div className="w-3/5 h-2/5">
          <img className="" src={product && product.productImage} alt="product_image"></img>
        </div>
        </td>
        </tr>
    </table>
        </div>
        <button className='bg-cyan-500 relative left-72  text-white my-5 py-2 px-4 rounded-lg hover:bg-cyan-600 ' onClick={()=>setOpenDetails(false)} >Close</button>
    </div>

  </div>

);
}


  
