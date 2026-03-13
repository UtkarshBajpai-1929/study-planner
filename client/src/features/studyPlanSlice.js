import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/axios";

export const getPlan = createAsyncThunk(
  "studyPlan/getPlan",
  async(goalId,thunkAPI)=>{
    try {
      const res = await API.get(`/get-study-plan/${goalId}`);
      return res.data.data.schedule;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const markTaskDone = createAsyncThunk(
  "studyPlan/markTaskDone",
  async (taskId, thunkAPI) => {
    try {
      const res = await API.patch(`/study-plan/mark-task-done/${taskId}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
const initialState = {
  studyPlans: [],
  loading: false,
  error: null
}
const studyPlanSlice = createSlice({
  name: "studyPlan",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
    .addCase(getPlan.fulfilled, (state,action)=>{
      state.loading = false;
      state.studyPlans = action.payload;
    })
    .addCase(getPlan.pending, (state)=>{
      state.loading = true
    })
    .addCase(getPlan.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(markTaskDone.fulfilled, (state, action) => {
   const taskId = action.payload._id;
   state.plan?.schedule?.forEach((day) => {
   const task = day.tasks.find((t) => t._id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  });
});
  }
});

export const studyPlanReducer = studyPlanSlice.reducer;