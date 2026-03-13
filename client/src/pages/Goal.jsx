import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGoals, createGoal, deleteGoal, generatePlan } from "../features/goalSlice";
import { getAllSubjects } from "../features/subjectSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Goal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goals,loading} = useSelector((state) => state.goals);
  const { subjects } = useSelector((state) => state.subjects);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dailystudyhours: "",
    deadline: "",
    status: "active",
    subjects: []
  });

  useEffect(() => {
    console.log("hi i am goal.")
    dispatch(getAllGoals());
    dispatch(getAllSubjects());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(id)
        ? prev.subjects.filter((s) => s !== id)
        : [...prev.subjects, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal(formData));

    setFormData({
      title: "",
      description: "",
      dailystudyhours: "",
      deadline: "",
      status: "active",
      subjects: []
    });
  };

  const handleDelete =(goalId)=>{
   dispatch(deleteGoal(goalId));
  
  }
  const handleGeneratePlan = async(goalId)=>{
   await dispatch(generatePlan(goalId)).unwrap();
    navigate(`/study-plan/${goalId}`);
  }
  const handleGetPlan = async(goalId)=>{
    await navigate(`/study-plan/${goalId}`);
  }
  return (
    <div className="p-6">
       <h1 className="text-2xl text-blue-950 font-semibold mb-4">Create Goal</h1>
      {/* Create Goal Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Goal Title"
          className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
        />

        <input
          name="dailystudyhours"
          value={formData.dailystudyhours}
          onChange={handleChange}
          placeholder="Daily Study Hours"
          className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
        />

        {/* Subjects selection */}
        <div>
          <p className="text-blue-900 font-semibold mb-2">Select Subjects</p>

          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <label key={subject._id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.subjects.includes(subject._id)}
                  onChange={() => handleSubjectChange(subject._id)}
                />
                {subject.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Goal
        </button>
      </form>

      {/* Goal List */}
      <hr/>
       <h1 className="text-2xl mt-6 text-blue-950 font-semibold mb-4">Your Goals</h1>
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
            onClick={()=>handleGeneratePlan(goal._id)}
             className="w-fit mt-[4px] px-3 py-1 text-center rounded-xl text-white bg-emerald-600 hover:bg-emerald-500"
             >
              {
                loading ? "Generating..." : "Generate Plan"
              }
             </button> 
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