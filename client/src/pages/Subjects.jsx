import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects, createSubject, deleteSubject } from "../features/subjectSlice";
import { MdDeleteOutline } from "react-icons/md";

const Subjects = () => {
  const dispatch = useDispatch();

  const { subjects, loading, error } = useSelector((state) => state.subjects);

  const [formData, setFormData] = useState({
    name: "",
    difficulty: "",
    time: ""
  });

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubject(formData));
    setFormData({ name: "", difficulty: "", time: "" });
  };

  const handleDelete = (subjectId)=>{
    dispatch(deleteSubject(subjectId))
  }

  if (loading) return <p className="p-6">Loading subjects...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-blue-950 font-semibold mb-4">
        Your Subjects
      </h1>

      {/* Create Subject Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-3 mb-6"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Subject Name"
          className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
        />

        <select
  name="difficulty"
  value={formData.difficulty}
  onChange={handleChange}
  className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
>
  <option value="">Select Difficulty</option>
  <option value="Easy">Easy</option>
  <option value="Medium">Medium</option>
  <option value="Hard">Hard</option>
</select>

        <input
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Time (hrs)"
          className="border border-blue-200 rounded px-3 py-2 bg-blue-50"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Subject
        </button>
      </form>

      {/* Subjects List */}
      <div className="flex flex-wrap gap-4">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="flex flex-col justify-center items-center w-auto sm:w-[200px] p-4 rounded shadow-sm bg-blue-50"
          >
            <h2 className="text-lg text-center text-blue-900 font-semibold">
              {subject.name}
            </h2>

            <p className="text-sm text-center mt-[8px] text-blue-700">
              Difficulty: {subject.difficulty}
            </p>

            <p className="text-sm text-center mt-[4px] text-blue-700">
              Time: {subject.time}
            </p>
            <button
            onClick={()=>handleDelete(subject._id)}
            className="w-fit mt-[6px] p-1 rounded bg-red-500 text-white text-center" 
            ><MdDeleteOutline className="text-center"/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;