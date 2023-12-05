import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RiEdit2Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import '../styles/HoverBlur.css'



export default function EditCustomer(  customer, onSubmit ) {
  
  const token = localStorage.getItem('accessToken');

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    customer_image: ''
});
const config = {
    headers: { Authorization: `Bearer ${token}`}
    }

const { id } = useParams();
  useEffect(() => {
    
        
    axios.get(`http://localhost:3001/customers/${id}`, config)
        .then((response) => {
        setCustomerInfo(response.data);
        
        })
        .catch((error) => {
        console.error('Error fetching user data:', error);
        });
    }, [id]);


  const notify = () => {toast.success('Customer Updated Successfully!', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
};


const formData = new FormData();
formData.append('customer_image', customerInfo.customer_image);


const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use the 'put' method to update the user data.
    axios.put(`http://localhost:3001/customers/${id}`, {
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        email: customerInfo.email,
        customer_image: formData.get("customer_image"),
    }, config).then(() => {
        notify();
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomerInfo({
          ...customerInfo,
          customer_image: reader.result,
          
        });
        
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDivClick = (event) => {
    event.preventDefault();
    // Trigger the hidden file input when the div is clicked
    fileInputRef.current.click();
  };
  const fileInputRef = React.createRef();


  if (!customerInfo) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className=''>
<div className=" max-w-2xl mx-auto  p-4 bg-white shadow-md rounded-lg">


<div className="flex justify-center text-xl text-cyan-500 font-bold ">
  <h2>Edit Customer</h2>
</div>
<div className='flex flex-col justify-center p-10 pb-5 mb-5 border rounded-xl'>
<div className='flex  flex-row justify-around '>
<div className='flex py-2 justify-center'>
<div className='profile flex justify-center'>
  
       <label htmlFor="fileInput" className=' flex second-col profile-img bg-no-repeat bg-cover' style={{ backgroundImage: `url(${customerInfo.customer_image})`, cursor: 'pointer' }} onClick={handleDivClick}>
        
          
        
      </label>
      <RiEdit2Fill className="icon text-white w-5 h-5 cursor-pointer  " onClick={handleDivClick}/>
       {/* Hidden file input */}
       <input
        type="file"
        name="user_image"
        id="user_image"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
    </div>  



<div className='first-row  flex justify-center'>
<table className='editUser'>
  <tbody>

<tr>
<td><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
      First Name
    </label></td>
<td><input
      className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      type="text"
      name="firstName"
      id="firstName"
      value={customerInfo.firstName}
      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
      required
      placeholder={customerInfo.first_name}
    /></td>
</tr>
<tr>
<td><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
      Last Name
    </label></td>
<td><input
      className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      type="text"
      name="lastName"
      id="lastName"
      value={customerInfo.lastName}
      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
      required
      placeholder={customerInfo.last_name}
    /></td>
</tr>
<tr>
<td><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
      Email
    </label></td>
<td><input
      className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      type="email"
      name="email"
      id="email"
      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
      required
      placeholder={customerInfo.email}
    /></td>


</tr>
  </tbody>

</table>

</div>

</div>
<div className='flex justify-center'>
    <button
      className="bg-cyan-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-blue-300"
      type="submit"
      onClick={handleSubmit}
    >
      Update Customer
    </button>
  </div>
</div>

<ToastContainer/>
</div>
    </div>
    
  );
}