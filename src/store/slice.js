import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axios';

export const fetchInfo = createAsyncThunk('info/fetchInfo', async () => {
  const { data } = await axios.get('/');
  return data;
});

export const fetchRemoveInfo = createAsyncThunk(
  'info/fetchRemoveInfo',
  async (id) => {
    await axios.delete(`/${id}`);
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const slice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInfo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    });
    builder.addCase(fetchInfo.rejected, (state) => {
      state.items = [];
      state.status = 'error';
    });

    builder.addCase(fetchRemoveInfo.pending, (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload);
    });
  },
});

export const reducer = slice.reducer;
