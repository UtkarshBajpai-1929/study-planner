import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlan } from "../features/studyPlanSlice";
import { useParams } from "react-router-dom";

const StudyPlan = () => {
  const dispatch = useDispatch();
  const { goalId } = useParams();

  const { studyPlans, loading, error } = useSelector(
    (state) => state.studyPlan
  );
  console.log("studyPlans:", studyPlans)
  useEffect(() => {
    if (goalId) {
      dispatch(getPlan(goalId));
    }
  }, [dispatch, goalId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading study plan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Study Plan
      </h1>

      {studyPlans?.length === 0 ? (
        <p>No study plan available</p>
      ) : (
        studyPlans.map((day, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >

            <h2 className="text-xl font-semibold mb-3">
              Day {index + 1} - {new Date(day.date).toLocaleDateString()}
            </h2>

            <div className="space-y-2">
              {day.tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-3 rounded-md"
                >
                  <div>
                    <p className="font-medium">
                      {task.subject?.name || "Subject"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {task.hours} hours
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                  />
                </div>
              ))}
            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default StudyPlan;