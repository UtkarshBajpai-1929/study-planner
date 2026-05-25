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
    <div>
       <h1 className="text-2xl text-blue-950 font-semibold mb-4">Create Goal</h1>
      {/* Create Goal Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid gap-3">

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Goal Title"
          className="w-full rounded border border-blue-200 bg-blue-50 px-3 py-2"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full rounded border border-blue-200 bg-blue-50 px-3 py-2"
        />

        <input
          name="dailystudyhours"
          value={formData.dailystudyhours}
          onChange={handleChange}
          placeholder="Daily Study Hours"
          className="w-full rounded border border-blue-200 bg-blue-50 px-3 py-2"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full rounded border border-blue-200 bg-blue-50 px-3 py-2"
        />

        {/* Subjects selection */}
        <div>
          <p className="text-blue-900 font-semibold mb-2">Select Subjects</p>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <label key={subject._id} className="flex min-w-0 items-center gap-2 rounded bg-blue-50 px-3 py-2">
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
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Goal
        </button>
      </form>

      {/* Goal List */}
      <hr/>
       <h1 className="text-2xl mt-6 text-blue-950 font-semibold mb-4">Your Goals</h1>
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
