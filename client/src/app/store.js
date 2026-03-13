import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { subjectReducer } from "../features/subjectSlice";
import { goalReducer } from "../features/goalSlice";
import { studyPlanReducer } from "../features/studyPlanSlice";
import { dashboardReducer } from "../features/dashboardSlice";
import { analyticsReducer } from "../features/analyticsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectReducer,
    goals: goalReducer,
    studyPlan: studyPlanReducer,
    dashboard: dashboardReducer,
    analytics: analyticsReducer
  }
});