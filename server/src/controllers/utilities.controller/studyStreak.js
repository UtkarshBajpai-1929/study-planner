import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getStudyStreak = asyncHandler(async (req, res) => {

  if (!req.user) {
    throw new apiError(401, "Unauthorized request");
  }

  const studyPlan = await StudyPlan.findOne({
    user: req.user._id
  });

  if (!studyPlan) {
    throw new apiError(404, "Study plan not found");
  }

  let streak = 0;

  const sortedSchedule = [...studyPlan.schedule].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  let previousDate = null;

  for (const day of sortedSchedule) {

    const allCompleted = day.tasks.every(task => task.completed);

    if (!allCompleted) {
      // skip unfinished days until streak starts
      if (streak === 0) continue;
      break;
    }

    const currentDate = new Date(day.date);

    if (streak === 0) {
      streak = 1;
      previousDate = currentDate;
      continue;
    }

    const diffDays = Math.floor(
      (previousDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      streak++;
      previousDate = currentDate;
    } else {
      break;
    }
  }

  return res.status(200).json(
    new apiResponse(200, streak, "Study streak fetched")
  );
});

export {
  getStudyStreak,
};