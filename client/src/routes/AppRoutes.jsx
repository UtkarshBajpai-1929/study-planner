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
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>} >
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/goal' element={<Goal/>} />
      <Route path='/analytics' element={<Analytics/>} />
      <Route path='/study-plan' element={<StudyPlan1/>}></Route>
      <Route path='/study-plan/:goalId' element={<StudyPlan/>} />
      <Route path='/subjects' element={<Subjects/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
