import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const getWeeklyStats = createAsyncThunk(
  "analytics/getWeeklyStats",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/get-weekly-stats");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getSubjectDistribution = createAsyncThunk(
  "analytics/getSubjectDistribution",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/get-subject-distribution");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  weeklyStats: {},
  subjectDistribution: {},
  loading: false,
  error: null
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeeklyStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeeklyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStats = action.payload;
      })
      .addCase(getWeeklyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSubjectDistribution.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubjectDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectDistribution = action.payload;
      })
      .addCase(getSubjectDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const analyticsReducer = analyticsSlice.reducer;