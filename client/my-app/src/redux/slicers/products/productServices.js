import axios from 'axios';


const fetchProduct = async () => {
    try{
        const response = await axios.get('http://localhost:3001/products')   
        return response.data.data;
    }catch(error){
        console.log(error);
    }

}
const fetchProductDetails = async (productId) => {
  try {
      const response = await axios.get(`http://localhost:3001/products/${productId}`);
      if (response.status === 200) {
          return response.data; // Check response structure and return appropriate data
      } else {
          throw new Error('Failed to fetch product details');
      }
  } catch (error) {
      console.error(`Error fetching product details for ID ${productId}:`, error);
      throw new Error('Failed to fetch product details: ' + error.message);
  }
};
export default {fetchProduct, fetchProductDetails};

