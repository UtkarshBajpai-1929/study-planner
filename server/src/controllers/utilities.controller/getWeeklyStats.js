import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getWeeklyStats = asyncHandler(async (req, res) => {

  const userId = req.user._id;

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const plans = await StudyPlan.find({
    user: userId,
    "schedule.date": { $gte: last7Days }
  });

  const stats = {};

  plans.forEach(plan => {
    plan.schedule.forEach(day => {

      const date = new Date(day.date).toLocaleDateString();

      day.tasks.forEach(task => {

        if (task.completed) {
          stats[date] = (stats[date] || 0) + task.hours;
        }

      });

    });
  });

  return res
    .status(200)
    .json(new apiResponse(200, stats, "Weekly stats fetched"));

});