import React from 'react'
import {Routes, Route} from "react-router-dom"
import Analytics from '../pages/Analytics'
import Dashboard from '../pages/Dashboard'
import Goal from '../pages/Goal'
import Login from '../pages/Login'
import Register from '../pages/Register'
import StudyPlan from '../pages/StudyPlan'
import Subjects from '../pages/Subjects'
import MainLayout from '../components/layout/MainLayout'
import ProtectedRoute from './ProtectedRoutes'
import StudyPlan1 from '../pages/StudyPlan1'
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>} >
      <Route path='/' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
      <Route path='/goal' element={<ProtectedRoute><Goal/></ProtectedRoute>} />
      <Route path='/analytics' element={<ProtectedRoute><Analytics/></ProtectedRoute>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/study-plan' element={<ProtectedRoute><StudyPlan1/></ProtectedRoute>}></Route>
      <Route path='/study-plan/:goalId' element={<ProtectedRoute><StudyPlan/></ProtectedRoute>} />
      <Route path='/subjects' element={<ProtectedRoute><Subjects/></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
