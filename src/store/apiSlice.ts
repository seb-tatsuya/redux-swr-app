import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// APIからデータをフェッチする非同期アクション
export const fetchData = createAsyncThunk('api/fetchData', async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});

interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch data';
        state.loading = false;
      });
  },
});

export default apiSlice.reducer;
