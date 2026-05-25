import React, { useEffect } from 'react'
import Goal from '../components/Goal'
import { useDispatch, useSelector } from "react-redux";
import EmptyState from '../components/EmptyState';
import { getAllGoals } from '../features/goalSlice';
const StudyPlan1 = ()=>{
  const dispatch = useDispatch();
  const { goals, loading } = useSelector((state) => state.goals);
  const length = goals.length;

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  if (loading) {
    return <p className="p-4 text-gray-700 sm:p-6">Loading study plans...</p>;
  }

  return (
    <>
    {length > 0 ? (
      <Goal/>
    ): (<EmptyState/>)}
    
    </>
  )
}
export default StudyPlan1;
