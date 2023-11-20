import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import customerServices from './customerServices';



const initialState = {
    loading: false,
    customer: [],
    customerDetail: [],
    error: '',
}

//generate pending, fulfilled and rejected action types


export const fetchCustomers = createAsyncThunk('customer/fetchCustomers',async (_, thunkAPI) => {
    
    try {
        const customers = await customerServices.fetchCustomers();
        console.log(customers);
        return customers;
        
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

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchCustomers.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchCustomers.fulfilled, (state, action) => {
            state.loading = false
            state.customer = action.payload
            state.error = ''
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
            state.loading = false
            state.customer = []
            state.error = action.error.message
        })
    },
})


export default customerSlice.reducer