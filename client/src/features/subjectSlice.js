import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";
export const getAllSubjects = createAsyncThunk(
  "subjects/getAllSubjects",
  async(_,thunkAPI)=>{
    try {
      const res = await API.get("/get-all-subjects");
      return res.data.data || []
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to load subjects");
    }
  }
)

export const createSubject = createAsyncThunk(
"subjects/createSubject",
async(data, thunkAPI)=>{
  try {
     const res = await API.post("/create-subject", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    return res.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to create subject");
  }
}
);

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject", 
  async(subjectId,thunkAPI)=>{
   try {
     await API.post(`/delete-subject/${subjectId}`);
     return subjectId;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to delete subject");
   }
  }
);

const initialState = {
  subjects : [],
  loading: false,
  error: null,
}
const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers:{

  },
  extraReducers: (builder)=>{
    builder
    .addCase(getAllSubjects.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllSubjects.fulfilled, (state,action)=>{
      state.loading = false,
      state.error = null,
      state.subjects = action.payload
    })
    .addCase(getAllSubjects.rejected, (state,action)=>{
      state.loading = false,
      state.error = action.payload
    });

    builder
    .addCase(createSubject.fulfilled, (state,action)=>{
      state.loading = false;
      state.subjects.push(action.payload);
    });

    builder
    .addCase(deleteSubject.fulfilled, (state,action)=>{
      state.loading = false;
      state.subjects = state.subjects.filter((subject)=>subject._id!==action.payload)
    })
  }
});

export const subjectReducer = subjectSlice.reducer
