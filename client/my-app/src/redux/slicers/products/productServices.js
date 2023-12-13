import axios from 'axios';

const productModule = {
  async fetchProduct() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/products`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch products');
    }
  },

  async fetchProductDetails(productId) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/products/${productId}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch product details');
      }
    } catch (error) {
      console.error(`Error fetching product details for ID ${productId}:`, error);
      throw new Error('Failed to fetch product details: ' + error.message);
    }
  }
};

export default productModule;
