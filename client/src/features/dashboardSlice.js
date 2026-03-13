import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const getTodayTasks = createAsyncThunk(
  "dashboard/getTodayTasks",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/study-plan/get-today-task");
     
      return res.data.data.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getUpcomingTasks = createAsyncThunk(
  "dashboard/getUpcomingTasks",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/get-upcoming-plan");
      return res.data.data[1].tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getProgress = createAsyncThunk(
  "dashboard/getProgress",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/track-progress");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getStudyStreak = createAsyncThunk(
  "dashboard/getStudyStreak",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/get-study-streak");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  todayTasks: [],
  upcomingTasks: [],
  progress: null,
  streak: null,
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodayTasks.fulfilled, (state, action) => {
        state.todayTasks = action.payload;
      })
      .addCase(getUpcomingTasks.fulfilled, (state, action) => {
        state.upcomingTasks = action.payload;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      .addCase(getStudyStreak.fulfilled, (state, action) => {
        state.streak = action.payload;
      });
  }
});

export const dashboardReducer = dashboardSlice.reducer;