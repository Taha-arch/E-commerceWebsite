import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SearchQuery: [], 
  loading: false,
  error: null,
};

const SearchQuerySlice = createSlice({
  name: 'SearchQuery',
  initialState,
  reducers: {
    clearSearchQuery: (state) => {
      state.SearchQuery = []; 
      state.loading = false;
      state.error = null;
    },
    addSearchQuery: (state, action) => {
      state.SearchQuery = action.payload; 
    },
    removeSearchQuery: (state, action) => {
      state.SearchQuery = state.SearchQuery.filter((query) => query !== action.payload);
    },
  },
});

export const { clearSearchQuery, addSearchQuery, removeSearchQuery } = SearchQuerySlice.actions;
export default SearchQuerySlice.reducer;
