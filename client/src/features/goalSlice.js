import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/axios";
export const getAllGoals = createAsyncThunk(
  "goals/getAllGoals", 
  async(_, thunkAPI)=>{
    try {
      const res = await API.get("/get-all-goals");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/create-goal", data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async(goalId, thunkAPI)=>{
    try {
      const res = await API.post(`/delete-goal/${goalId}`);
      return goalId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const generatePlan = createAsyncThunk(
  "goals/generatePlan", 
  async(goalId, thunkAPI)=>{
    try {
      const res = await API.post(`/generate-plan/${goalId}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
const initialState = {
  goals : [],
  error: null,
  loading:false,
}
const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers:{

  },
  extraReducers: (builder)=>{
    builder
    .addCase(getAllGoals.fulfilled, (state,action)=>{
      state.loading = false;
      state.goals = action.payload
    })
    .addCase(getAllGoals.pending, (state)=>{
      state.loading = true;
    })
    .addCase(getAllGoals.rejected, (state,action)=>{
      state.error = action.payload;
      state.loading = false
    });
  builder.addCase(createGoal.fulfilled, (state, action) => {
  state.goals.push(action.payload);
  });
  builder
  .addCase(deleteGoal.fulfilled, (state, action)=>{
    state.loading = false,
    state.goals = state.goals.filter((goal)=> goal._id !== action.payload);
  });

  builder
.addCase(generatePlan.pending, (state) => {
  state.loading = true;
})
.addCase(generatePlan.fulfilled, (state) => {
  state.loading = false;
})
.addCase(generatePlan.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  }
});
export const goalReducer = goalSlice.reducer;