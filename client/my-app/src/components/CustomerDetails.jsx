import React, {useState, useEffect} from 'react';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import axios from 'axios';



export default function CustomerDetails(props) {
  const {setOpenDetail,  selectedUser : selectedCustomer, setSelectedUser : setSelectedCustomer} = props;
  const token = localStorage.getItem('accessToken');
  const [customer, setCustomer] = useState(null);
  console.log(selectedCustomer);
  useEffect(() => {
    if (selectedCustomer) {
      const fetchCustomerDetails = async () => {
        try {
            const customer_id = selectedCustomer._id;
            const config = {
                headers: { Authorization: `Bearer ${token}`}
              }
            axios.get(`${process.env.REACT_APP_BASEURL}/customers/${customer_id}`, config)
            .then((response) =>{setCustomer(response.data)})
        } catch (error) {
          console.log(error);
        }
      };
      fetchCustomerDetails();
      console.log(customer)
    }
  }, [])
    return (
        
  <div className="flex flex-col rounded-xl max-w-xl h-[400px] mx-auto px-4 py-2 bg-white shadow-md  mt-10">
    
    <div className="py-7">
    <div className="flex justify-end  gap-2 text-xl font-bold ">
        <h2 className='mr-40 text-cyan-800'>Customer Details</h2>
        <button
          className=" text-white px-2  "
          type="button"
          onClick={() => {
            console.log(selectedCustomer)
            setOpenDetail(false);
            setSelectedCustomer(null);
            
            }} >
          <AiOutlineCloseCircle style = { {color: "IndianRed", fontSize: "1.5em"} } />
        </button>
      </div>
    </div>
    
    
    
<div className='flex justify-center mt-5'>
<div className=" flex second-col h-40   mr-10">
          <img className="flex  rounded-full " src={customer && customer.customer_image} alt="#"></img>
        </div>
<div className='first-row'>
<table className='userDetails'>
<tbody>
<tr>
    <td className='font-bold'>FIRST NAME :</td>
    <td>{customer && customer.first_name}</td>
</tr>
<tr>
    <td className='font-bold'>LAST NAME:</td>
    <td>{customer && customer.last_name}</td>
</tr>
<tr>
    <td className='font-bold'>STATUS :</td>
    <td>{customer && customer.active ? (
                    // <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-lightgreen" />
                    <span>ACTIVE</span>
                  ) : (
                    // <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-red-500" />
                    <span>INACTIVE</span>
                  )}</td>
</tr>
<tr>
    <td className='font-bold'>EMAIL :</td>
    <td>{customer && customer.email}</td>
</tr>
<tr>
    <td className='font-bold'>CREATION DATE:</td>
    <td>{customer && new Date(customer.creation_date).toLocaleDateString(undefined,{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'})}</td>
</tr>
</tbody>
</table>
</div>

</div>

  </div>
);
}