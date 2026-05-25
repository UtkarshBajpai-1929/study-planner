import React, { useEffect } from "react";
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
    <div>
       <h1 className="text-2xl mt-6 text-blue-950 font-semibold mb-4">Your StudyPlans</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <div
            key={goal._id}
           className="flex min-w-0 flex-col items-center justify-center rounded bg-blue-50 p-5 shadow-sm"
          >
            <div className="flex w-full items-start justify-center gap-2">
            <h2 className="min-w-0 text-center text-lg font-semibold text-blue-900">
              {goal.title}
            </h2>
            <button
              onClick={()=>handleDelete(goal._id)}
             className="mt-1 shrink-0 rounded bg-red-500 p-1 text-center text-white hover:bg-red-400" 
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
