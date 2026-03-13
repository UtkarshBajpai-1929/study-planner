import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getSubjectDistribution = asyncHandler(async (req, res) => {

  const userId = req.user._id;

  const plans = await StudyPlan.find({ user: userId })
    .populate("schedule.tasks.subject");

  const distribution = {};

  plans.forEach(plan => {
    plan.schedule.forEach(day => {

      day.tasks.forEach(task => {

        if (task.completed) {

          const name = task.subject.name;

          distribution[name] =
            (distribution[name] || 0) + task.hours;

        }

      });

    });
  });

  return res
    .status(200)
    .json(new apiResponse(200, distribution, "Subject stats fetched"));

});