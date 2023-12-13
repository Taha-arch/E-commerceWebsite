import axios from 'axios';
const token = localStorage.getItem('accessToken');
const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

const fetchCustomers = async () => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/customers`,config)   
        return response.data;
    }catch(error){
        console.log(error);
    }

}
const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/customers/${customerId}`);
      console.log('Im here'+ response.data)
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product details: ' + error.message);
    }
  };

export default  {fetchCustomers, fetchCustomerDetails};
