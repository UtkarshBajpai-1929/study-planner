import { StudyPlan } from "../../models/studyPlan.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const markTaskDone = asyncHandler(async(req,res)=>{
  const {taskId} = req.params;
  if(!taskId){
    throw new apiError(400, "Task ID is not in params");
  }
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }

  const studyPlan = await StudyPlan.findOne({
    user: req.user?._id
  });
  if(!studyPlan){
    throw new apiError(400, "No studyplan was found");
  }
  let taskFound = false;
  for(let i=0; i<studyPlan.schedule.length; i++){
    for(let j=0; j<studyPlan.schedule[i].tasks.length; j++){
      const task = studyPlan.schedule[i].tasks[j]

      if(task._id.toString() === taskId){
        task.completed = !task.completed;
        taskFound = true;
        break;
      }
    }
    if(taskFound) break;
  }
  if(!taskFound){
    throw new apiError(400, "Task not found")
  }

  await studyPlan.save({validateBeforeSave:false});
  return res.status(200)
  .json(new apiResponse(200,studyPlan, "Task updated"));
})
export {
  markTaskDone,
}