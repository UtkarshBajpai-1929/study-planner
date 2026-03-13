import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getStudyPlan = asyncHandler(async(req,res)=>{
  const {goalId} = req.params;
  if(!goalId){
    throw new apiError(400, "Goal id is not in params");
  }
  if(!req.user){
    throw new apiError(401, "Unauthorised req");
  }

  const studyPlan = await StudyPlan.findOne({
    goal: goalId,
    user: req.user?._id
  }).populate("schedule.tasks.subject");

  return res.status(200)
  .json(new apiResponse(200, studyPlan, "Got the study plan"))
});
export {
  getStudyPlan,
}