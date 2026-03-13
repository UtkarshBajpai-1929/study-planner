import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodayTasks,
  getUpcomingTasks,
  getProgress,
  getStudyStreak
} from "../features/dashboardSlice";
import { markTaskDone } from "../features/studyPlanSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { todayTasks, upcomingTasks, progress, streak } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getTodayTasks());
    dispatch(getUpcomingTasks());
    dispatch(getProgress());
    dispatch(getStudyStreak());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-emerald-500 p-4 rounded shadow-sm text-center">
          <h2 className="text-lg text-white font-semibold">Study Streak</h2>
          <p className="text-2xl mt-2 text-white">{streak} 🔥</p>
        </div>

        <div className="bg-pink-500 p-4 rounded shadow-sm text-center">
          <h2 className="text-lg text-white font-semibold">Progress</h2>
          <p className="text-2xl mt-2 text-white">
            {progress?.percentage || 0}%
          </p>
        </div>

        <div className="bg-purple-500 p-4 rounded shadow-sm text-center">
          <h2 className="text-lg text-white font-semibold">
            Tasks Today
          </h2>
          <p className="text-2xl mt-2 text-white">
            {todayTasks?.length || 0}
          </p>
        </div>

      </div>

      {/* Today's Tasks */}
      <div className="bg-gray-500 p-4 rounded shadow-sm">
        <h2 className="text-xl text-white font-semibold mb-3">
          Today's Tasks
        </h2>

        {todayTasks.length === 0 ? (
          <p className="text-white">No tasks today</p>
        ) : (
          todayTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between border-b border-white py-2"
            >
              <div>
                <p className="text-white font-medium">
                  {task.subject?.name || "subject"}
                </p>
                <p className="text-sm text-white">
                  {task.hours} hrs
                </p>
              </div>

              <input
                className=" h-5 w-5 text-indigo-600 rounde"
                type="checkbox"
                checked={task.completed}
                onChange={async () => {
               await dispatch(markTaskDone(task._id))
              dispatch(getTodayTasks());
              dispatch(getProgress());
              dispatch(getStudyStreak());
}}
              />
            </div>
          ))
        )}
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-gray-900 p-4 rounded shadow-sm">
        <h2 className="text-xl text-white font-semibold mb-3">
          Upcoming Tasks
        </h2>

        {upcomingTasks?.length === 0 ? (
          <p className="text-white">No upcoming tasks</p>
        ) : (
          upcomingTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between border-b border-blue-200 py-2"
            >
              <p className="text-white">{task.subject?.name || "Subject"}</p>
              <p className="text-white">{task.hours} hrs</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;