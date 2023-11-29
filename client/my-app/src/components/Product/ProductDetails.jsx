import React, {useState, useEffect} from 'react';
import ImageSlider from "../imageSlider";


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

  }, [selectedProduct]);

  
    return (

  <div className="popup-details rounded-md overflow-y-auto h-1/3 mx-auto px-4 py-2 bg-white shadow-md  mt-3">
    <button className="close-detail bg-red-500 text-white p-1 px-2 mt-1 rounded-sm hover:bg-red-600" onClick={()=>setOpenDetails(false)} >X</button>
    <div className=" py-2">
    <div className="flex mr-8 pr-20">
        <h2 className='text-xl text-center product-title-details text-cyan-500'>Product Details</h2>
      </div>
    </div>
    <div className="bodyPopup pt-2 ml-2">
        <div className="container flex gap-3">
          <div className="w-5/5 h-5/5 image-product">
        
          {/* {product && product.productImage && product.productImage.length > 0 && (
              <div className="pt-4 image-slider w-1/2 h-1/2">
                <ImageSlider images={product.productImage} />
              </div>
            )} */}
          <img className="" src={product && product.productImage[0]} alt="product_image"></img>
        
          </div>
        <table className='productDetails '>
        <tr className=''>
            <td className='item-detail '>Product:</td>
            <td>{product && product.productName}</td>
            <td className=''></td>
            <td className='item-detail w-1/4 '>Sku:</td>
            <td className=''>{product && product.sku}</td>
          
        </tr>
        <tr>
            <td className='item-detail pr-2'>Category:</td>
            <td>{product && product.categoryName}</td>
            <td className=''></td>
            <td  className='item-detail '>Subcategory:</td>
            <td>{product && product.subcategoryName}</td>
        </tr>

        <tr>
            <td className='item-detail'>Price : </td>
            <td>{product && product.price}</td>
            <td className=''></td>
            <td className='item-detail'>Discount Price: </td>
            <td> {product && product.discountPrice}</td>
        </tr>

        <tr>
            <td className='item-detail'>Quantity: </td>
            <td>{product && product.quantity}</td>
            <td className=''></td>
            <td className='item-detail'>Active: </td>
            <td>{product && product.active ? 'true' : 'false'}</td>
        </tr>

        <tr>
            <td  colSpan={2} className='item-detail '>Short Description:</td>
            
            <td colSpan={3} > {product && product.shortDescription}</td>
        </tr>
        <tr>
            <td  colSpan={2} className='item-detail pb-16 pr-4 '>Long Description:</td>
            
            <td colSpan={3} className='p-1'> {product && product.longDescription}</td>
        </tr>

    </table>
        </div>

    </div>

  </div>

);
}
