import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/login", data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async(data, thunkAPI) =>{
    try {
      const res = await API.post("/register", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser", 
  async(_, thunkAPI) =>{
    try {
      const res = await API.get("/get-current-user");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
export const updateProfilePic = createAsyncThunk(
  "auth/updateProfilePic",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("profile", file);

      const res = await API.post("/update-profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return res.data.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  profileUploading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
       .addCase(getCurrentUser.pending, (state) => {
    state.loading = true;
  })
  .addCase(getCurrentUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  .addCase(getCurrentUser.rejected, (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  });

  builder
  .addCase(updateProfilePic.pending, (state) => {
    state.profileUploading = true;
  })
  .addCase(updateProfilePic.fulfilled, (state, action) => {
    state.profileUploading = false;
    state.user.profile = action.payload.profile;
  })
  .addCase(updateProfilePic.rejected, (state) => {
    console.log("uploading failed")
    state.profileUploading = false;
  });
  }
});

export const { logout } = authSlice.actions;
export const authReducer =  authSlice.reducer;