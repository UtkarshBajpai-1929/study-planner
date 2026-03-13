import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getTotalProgress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const plan = await StudyPlan.findOne({ user: userId });

  if (!plan) {
    throw new apiError(404, "Study plan not found");
  }

  let totalTasks = 0;
  let completedTasks = 0;

  plan.schedule.forEach((day) => {

    totalTasks += day.tasks.length;

    day.tasks.forEach((task) => {
      if (task.completed) {
        completedTasks++;
      }
    });

  });

  const progress = totalTasks === 0
    ? 0
    : ((completedTasks / totalTasks) * 100).toFixed(2);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        totalTasks,
        completedTasks,
        progress
      },
      "Total progress fetched successfully"
    )
  );

});
export{
  getTotalProgress,
}