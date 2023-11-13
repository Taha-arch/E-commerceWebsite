import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default function ProductDelete(props) {

const {setOpenDelete, selectedProduct, setSelectedProduct,setProducts} = props;

const notify = () => swal(
    {
      title: 'Product deleted successfully',
      icon: 'success',
      button: 'close',
      className: 'alert-supp',
    }
  );

const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        const product_id = selectedProduct._id;
        await axios.delete(`http://localhost:3001/products/${product_id}`);
        
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== product_id)
        );
        setSelectedProduct(null);
        setOpenDelete(false);
        notify();
      } catch (error) {
        console.error('Error deleting product data:', error);
      }
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="title">
          <h1>Delete product</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this product : {selectedProduct.productName}?</p>
        </div>
        <div className="footer">
          <button className='bg-cyan-500 text-white py-2 px-2 rounded-md hover:bg-cyan-600 'onClick={() => setOpenDelete(false)} id="cancelBtn">
            Cancel
          </button>
          <button
          className="bg-red-500 py-2 px-2 text-white rounded-md hover:bg-red-600 ml-2"
            onClick={() => {
                handleDeleteProduct();
                setOpenDelete(false); 
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
};

