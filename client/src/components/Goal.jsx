import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGoals, deleteGoal } from "../features/goalSlice";
import { getAllSubjects } from "../features/subjectSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Goal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goals} = useSelector((state) => state.goals);
  
  useEffect(() => {
    console.log("hi i am goal component")
    dispatch(getAllGoals());
    dispatch(getAllSubjects());
  }, [dispatch]);
  const handleDelete =(goalId)=>{
   dispatch(deleteGoal(goalId));
  }
  const handleGetPlan = async(goalId)=>{
    await navigate(`/study-plan/${goalId}`);
  }
  return (
    <div className="p-6">
       <h1 className="text-2xl mt-6 text-blue-950 font-semibold mb-4">Your StudyPlans</h1>
      <div className="flex flex-wrap gap-4">
        {goals.map((goal) => (
          <div
            key={goal._id}
           className="flex flex-col justify-center items-center w-fit p-6 rounded shadow-sm bg-blue-50"
          >
            <div className="flex items-center">
            <h2 className="text-lg text-center text-blue-900 font-semibold">
              {goal.title}
            </h2>
            <button
              onClick={()=>handleDelete(goal._id)}
             className="w-fit ml-3 mt-[6px] p-1 rounded bg-red-500 hover:bg-red-400 text-white text-center" 
             ><MdDeleteOutline className="text-center"/></button>
            </div>
            <p className="text-sm text-center mt-2 text-blue-700">
              Deadline: {new Date(goal.deadline).toLocaleDateString()}
            </p>

            <p className="text-sm text-center mt-1 text-blue-700">
              Daily Hours: {goal.dailystudyhours}
            </p>
            <p className="text-sm text-center mt-1 text-blue-700">
              Current Status: {goal.status}
            </p>
          
             <button
             onClick={()=>handleGetPlan(goal._id)}
                className="w-fit mt-[4px] px-3 py-1 text-center rounded-xl text-white bg-pink-600 hover:bg-pink-500"
             >
              Get Plan
              </button> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goal;