import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';



const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: [],
    loading: false,
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
        state.loading = true
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = ''
    })
    builder.addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.user = []
        state.error = action.error.message
    })
},
});


const token = localStorage.getItem('accessToken');


export const fetchData = createAsyncThunk('user/fetchData', async (page) => {
    
    try {
      
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/users?page=${page}`, config);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      
      return data.data; // Assuming your response structure has a 'data' property
    } catch (error) {
      throw error;
    }
  });
  


export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = userSlice.actions;
export default userSlice.reducer;
