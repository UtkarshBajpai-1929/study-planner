import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getTodayTask = asyncHandler(async(req,res)=>{
  const today = new Date();
  today.setHours(0,0,0,0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  if(!req.user){
    throw new apiError(401, "Unauthorised Request")
  }
  const plan = await StudyPlan.findOne(
    {
      user: req.user?._id,
      "schedule.date":{
        $gte: today,
        $lt: tomorrow
      },
    },
    {
      "schedule.$": 1
    }
  ).populate("schedule.tasks.subject");

  if(!plan){
    throw new apiError(400, "No plan found");
  }
  const todayTask = plan.schedule[0];
  return res.status(200)
  .json(new apiResponse(200, todayTask, "Today task fetched"))
});
export{
  getTodayTask,
}