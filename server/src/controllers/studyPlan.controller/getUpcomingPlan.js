import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getUpcomingTasks = asyncHandler(async (req, res) => {

  if (!req.user) {
    throw new apiError(401, "Unauthorized request");
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const studyPlan = await StudyPlan.findOne({
    user: req.user._id
  }).populate("schedule.tasks.subject");

  if (!studyPlan) {
    throw new apiError(404, "Study plan not found");
  }

  const upcoming = studyPlan.schedule.filter(day => {
    const d = new Date(day.date);
    return d > today && d <= nextDay;
  });

  return res.status(200)
  .json(new apiResponse(200, upcoming, "Upcoming tasks fetched"));

});

export{
  getUpcomingTasks
}