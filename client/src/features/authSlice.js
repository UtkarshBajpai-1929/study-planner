import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/login", data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to login");
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to register");
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Session expired");
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
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Unable to update profile picture");
    }
  }
);
const initialState = {
  user: null,
  isAuthenticated: false,
  authChecking: true,
  authChecked: false,
  loginLoading: false,
  registerLoading: false,
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
      state.authChecked = true;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload;
      });

      builder
       .addCase(getCurrentUser.pending, (state) => {
    state.authChecking = true;
  })
  .addCase(getCurrentUser.fulfilled, (state, action) => {
    state.authChecking = false;
    state.authChecked = true;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  .addCase(getCurrentUser.rejected, (state) => {
    state.authChecking = false;
    state.authChecked = true;
    state.user = null;
    state.isAuthenticated = false;
  });

  builder
  .addCase(registerUser.pending, (state) => {
    state.registerLoading = true;
    state.error = null;
  })
  .addCase(registerUser.fulfilled, (state) => {
    state.registerLoading = false;
  })
  .addCase(registerUser.rejected, (state, action) => {
    state.registerLoading = false;
    state.error = action.payload;
  });

  builder
  .addCase(updateProfilePic.pending, (state) => {
    state.profileUploading = true;
  })
  .addCase(updateProfilePic.fulfilled, (state, action) => {
    state.profileUploading = false;
    if (state.user) {
      state.user.profile = action.payload.profile;
    }
  })
  .addCase(updateProfilePic.rejected, (state) => {
    state.profileUploading = false;
  });
  }
});

export const { logout } = authSlice.actions;
export const authReducer =  authSlice.reducer;
