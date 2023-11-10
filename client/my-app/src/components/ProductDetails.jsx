import React, {useState, useEffect} from 'react';
import '../styles/main.css';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {

  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
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
  }, [id]);

    return (

  <div className="max-w-4xl  overflow-y-auto h-[500px] mx-auto px-4 py-2 bg-white shadow-md  mt-3 ">
    
    <div className="  py-4">
    <div className="flex  pb-4 mr-10 pr-20">
        <h2 className='text-2xl ml-40 product-title-details'>Product Details</h2>
      </div>
    </div>

    <div className="bodyPopup pt-2">
  
        <div className="container flex justify-center gap-8">

        <div className='first-col'>
        <table className='productDetails'>

        <tr>
            <td>Name</td>
            <td>{product && product.productName}</td>
        </tr>
        <tr>
            <td>Sku</td>
            <td>{product && product.sku}</td>
        </tr>
        <tr>
            <td>Category Name</td>
            <td>{product && product.categoryName}</td>
        </tr>
        <tr>
            <td>Subcategory Name</td>
            <td>{product && product.subcategoryName}</td>
        </tr>
        
        <tr>
            <td>Price</td>
            <td>{product && product.price}</td>
        </tr>
        <tr>
            <td>Discount Price</td>
            <td>{product && product.discountPrice}</td>
        </tr>
        <tr>
            <td>Quantity</td>
            <td>{product && product.quantity}</td>
        </tr>
        <tr>
            <td>Active</td>
            <td>{product && product.active ? 'true' : 'false'}</td>
        </tr>
        <tr>
            <td>Short Description</td>
            <td>{product && product.shortDescription}</td>
        </tr>
        <tr>
            <td>Long Description</td>
            <td>{product && product.longDescription}</td>
        </tr>
    </table>
        </div>

        <div className="second-col w-2/5 h-3/5">
          <img className="" src={product && product.productImage} alt="product_image"></img>
        </div>
          
        </div>


    </div>

  </div>

);
}


  
