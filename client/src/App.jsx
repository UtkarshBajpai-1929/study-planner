import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCurrentUser())
  }, [dispatch]);
  return <AppRoutes/>
}

export default App
