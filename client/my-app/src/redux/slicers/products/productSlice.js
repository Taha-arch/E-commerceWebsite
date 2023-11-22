import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import productModule from './productServices';

const initialState = {
    loading: false,
    products: [],
    productDetails: null,
    error: '',
}

//generate pending, fulfilled and rejected action types
export const fetchProducts = createAsyncThunk('product/fetchProduct', async (_, thunkAPI) => {
    try {
        const products = await productModule.fetchProduct();
        return products;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
})

export const fetchProductDetailsById = createAsyncThunk('product/fetchProductDetailsById',async (productId, thunkAPI) => {
    try {
      const productDetails = await productModule.fetchProductDetails(productId);

      console.log('Im inside slice')
      console.log(productDetails)
      return productDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch product details');
    }
  }
);


const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = '';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      })
      .addCase(fetchProductDetailsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload; // Update productDetails
        state.error = '';
      })
      .addCase(fetchProductDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.productDetails = null; // Reset productDetails on rejection
        state.error = action.error.message;
      });
  },
});


export default productSlice;