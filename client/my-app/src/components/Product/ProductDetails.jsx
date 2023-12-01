import React, {useState} from 'react';
import ImageSlider from './ImageSlider';

export default function ProductDetails(props) {

  const { selectedProduct, setOpenDetails } = props;
// console.log(selectedProduct.productImage.map((url) => ( url )))
//   const slides = selectedProduct.productImage;
  const containerStyles = {
    width: "300px",
    height: "280px",
    margin: "0 auto",
    
  };
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
        <div className="container flex gap-3">
          {selectedProduct && selectedProduct.productImage && selectedProduct.productImage.length > 0 && (
            <div style={containerStyles}>
              <ImageSlider slides={selectedProduct.productImage} />
            </div>
          )}
        </div>
        <table className='productDetails '>
        <tr className=''>
            <td className='item-detail '>Product:</td>
            <td>{selectedProduct && selectedProduct.productName}</td>
            <td className=''></td>
            <td className='item-detail w-1/4 '>Sku:</td>
            <td className=''>{selectedProduct && selectedProduct.sku}</td>
          
        </tr>
        <tr>
            <td className='item-detail pr-2'>Category:</td>
            <td>{selectedProduct && selectedProduct.categoryName}</td>
            <td className=''></td>
            <td  className='item-detail '>Subcategory:</td>
            <td>{selectedProduct && selectedProduct.subcategoryName}</td>
        </tr>

        <tr>
            <td className='item-detail'>Price : </td>
            <td>{selectedProduct && selectedProduct.price}</td>
            <td className=''></td>
            <td className='item-detail'>Discount Price: </td>
            <td> {selectedProduct && selectedProduct.discountPrice}</td>
        </tr>

        <tr>
            <td className='item-detail'>Quantity: </td>
            <td>{selectedProduct && selectedProduct.quantity}</td>
            <td className=''></td>
            <td className='item-detail'>Active: </td>
            <td>{selectedProduct && selectedProduct.active ? 'true' : 'false'}</td>
        </tr>

        <tr>
            <td  colSpan={2} className='item-detail '>Short Description:</td>
            
            <td colSpan={3} > {selectedProduct && selectedProduct.shortDescription}</td>
        </tr>
        <tr>
            <td  colSpan={2} className='item-detail pb-16 pr-4 '>Long Description:</td>
            
            <td colSpan={3} className='p-1'> {selectedProduct && selectedProduct.longDescription}</td>
        </tr>

    </table>
        </div>

    </div>

  </div>

);
}
