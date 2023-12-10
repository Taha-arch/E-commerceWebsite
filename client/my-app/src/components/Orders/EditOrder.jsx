import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditOrder({ order }) {
    const initialStatus = order ? order.status : '';
    const initialItems = order && order.order_items ? order.order_items : [];
    const [status, setStatus] = useState(initialStatus);
    const [items, setItems] = useState(initialItems);

  const { id } = useParams();

  const token = localStorage.getItem('accessToken'); 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/orders/${id}`, config)
      .then((response) => {
        setItems(response.data.order.order_items);
        setStatus(response.data.order.status);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, [id]);

  const notify = () => {
    toast.success('Order Updated Successfully!', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for updating order
    const updatedOrder = {
      order_items: items,
      status: status,
    };

    // Use the 'put' method to update the order data.
    axios.put(`http://localhost:3001/orders/${id}`, updatedOrder, config)
      .then(() => {
        notify(); 
      })
      .catch((error) => {
        console.error('Error updating order:', error);
      });
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...items];
    if (key === 'product_id') {
      updatedItems[index][key] = value;
    } else if (key === 'quantity') {
      updatedItems[index][key] = parseInt(value); // Ensure quantity is stored as a number
    }
    setItems(updatedItems);
  };
  

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="bg-white p-6 rounded-lg shadow-md w-full sm:w-3/4 lg:w-1/2 xl:w-2/5" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Edit Order</h1>
        <div className="mb-4">
          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1">Product ID {index + 1}</label>
              <input
                type="text"
                className="w-full border-2 rounded-lg p-2"
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
              />
              <label className="block mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border-2 rounded-lg p-2"
                value={item.product_name}
                onChange={(e) => handleItemChange(index, 'product_name', e.target.value)}
              />
              <label className="block mt-2 mb-1">Quantity</label>
              <input
                type="number"
                className="w-full border-2 rounded-lg p-2"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            onClick={() => setItems([...items, { product_id: '',product_name: '', quantity: 0 }])}
          >
            Add Item
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            className="w-full border-2 rounded-lg p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PLACED">PLACED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
          }  

