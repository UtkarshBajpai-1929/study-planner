import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeeklyStats,
  getSubjectDistribution
} from "../features/analyticsSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#1e3a8a"];

const Analytics = () => {
  const dispatch = useDispatch();

  const { weeklyStats, subjectDistribution } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(getWeeklyStats());
    dispatch(getSubjectDistribution());
  }, [dispatch]);

  const weeklyData = Object.keys(weeklyStats).map((date) => ({
    date,
    hours: weeklyStats[date]
  }));

  const subjectData = Object.keys(subjectDistribution).map((subject) => ({
    name: subject,
    value: subjectDistribution[subject]
  }));

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl text-blue-950 font-semibold">
        Analytics
      </h1>

      {/* Weekly Study Chart */}
      <div className="bg-blue-50 p-4 rounded shadow-sm">

        <h2 className="text-lg text-blue-900 font-semibold mb-4">
          Weekly Study Hours
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Subject Distribution */}
      <div className="bg-blue-50 p-4 rounded shadow-sm">

        <h2 className="text-lg text-blue-900 font-semibold mb-4">
          Subject Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={subjectData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {subjectData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Analytics;