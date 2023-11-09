import React, {useState, useEffect} from 'react';


export default function ProductDetails(props) {
  const {setOpenDetail, selectedProduct, setSelectedProduct} = props;

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
  }, [selectedProduct])
    return (
        
  <div className="max-w-4xl  mx-auto  p-4 bg-white shadow-md  h-full">
    
    <div className="headerPopup">
    <div className="flex justify-start gap-2 pb-4 pr-20">
        <button
          className="bg-red-400 text-white py-1 px-2  hover:bg-red-600"
          type="button"
          onClick={() => {
            setOpenDetail(false);
            setSelectedProduct(null);
            
            }} >
          X
        </button>
      </div>
    </div>

     <div className="bodyPopup">
     
        <h2>Product Details</h2>
        

        <div className="">

        <div className="item "><img className="" src={product && product.productImage} alt="product_image"></img> </div>
        <div>
        
        <div className="item">Name : {product && product.productName}</div>
        <div className="item">Sku: {product && product.sku}</div>
        <div className="item">Category Name: {product && product.categoryName}</div>
        <div className="item">subCategory Name : {product && product.subcategoryName}</div>
        <div className="item">short description : {product && product.shortDescription}</div>
        </div>
        <div>
        <div className="item">Price : {product && product.price}</div>
        <div className="item">discount price : {product && product.discount_price}</div>
        <div className="item">Quantity : {product && product.quantity}</div>
        <div className="item">Active : {product && product.active}</div>
        <div className="item">Long description : {product && product.longDescription}</div>
        </div>
        </div>
         
     </div>

      <div className="flex justify-end gap-2 py-4 pr-20">
        <button
          className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-green-300"
          type="button"
          onClick={() => {
            setOpenDetail(false);
            setSelectedProduct(null);
            }}>
          Close
        </button>
      </div>

  </div>
);
}


  
