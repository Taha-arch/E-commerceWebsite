import { createSlice } from '@reduxjs/toolkit';
import { fetchSubcategories } from './subcategoryServices';

const initialState = {
    subcategories: null,
    loading: false,
    error: null,
};

const SubcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
        state.error = null;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Something went wrong with subcategories';
      });
  },
});

export default SubcategoriesSlice.reducer;