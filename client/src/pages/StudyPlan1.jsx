import React from 'react'
import Goal from '../components/Goal'
import { useDispatch, useSelector } from "react-redux";
import EmptyState from '../components/EmptyState';
const StudyPlan1 = ()=>{
  const { goals} = useSelector((state) => state.goals);
  let length = goals.length;
  return (
    <>
    {length > 0 ? (
      <Goal/>
    ): (<EmptyState/>)}
    
    </>
  )
}
export default StudyPlan1;