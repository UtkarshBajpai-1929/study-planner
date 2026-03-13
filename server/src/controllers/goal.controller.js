import { Goal } from "../models/goal.model.js";
import { Subject } from "../models/subject.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createGoal = asyncHandler(async(req,res)=>{
  const {title, subjects, description, dailystudyhours, deadline, status} = req.body;

  if(!title|| !description || !dailystudyhours || !deadline || !status){
    throw new apiError(400, "All fields are required");
  }

  if(!subjects || subjects.length ===0 ){
    throw new apiError(400, "Cannot create goal without subject");
  }
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }
  const isValidSubject = await Subject.find({
    _id : {$in: subjects},
    user: req.user?._id
  })
  if(isValidSubject.length !== subjects.length){
    throw new apiError(400, "Invalid subjects");
  }
  const goal = await Goal.create({
    title,
    description,
    dailystudyhours,
    deadline,
    status,
    user: req.user?._id,
    subjects,
  });

  return res.status(201)
  .json(new apiResponse(201, goal, "Goal created successfully"));
});

const getAllGoals = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised user")
  }
  const goals = await Goal.find({
    user: req.user?._id
  });
return res.status(200)
.json(new apiResponse(200, goals, "All Goals fetched"))
});

const getSingleGoal = asyncHandler(async(req,res)=>{
  const {goalId} = req.params;
  if(!goalId){
    throw new apiError(400, "No ID found");
  }
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }

  const goal = await Goal.findOne({
    _id: goalId,
    user: req.user?._id
  });

  if(!goal){
    throw new apiError(400, "No goal found");
  }

  return res.status(200)
  .json(new apiResponse(200, goal, "Goal fetched"))
});

const updateGoal = asyncHandler(async(req,res)=>{
  const {title, subjects, dailystudyhours, description, deadline, status} = req.body;
  const {goalId} = req.params;
  if(!goalId){
    throw new apiError(400, "No ID found");
  }
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }
  const goal = await Goal.findOne({
    _id: goalId,
    user: req.user?._id
  });
  if(!goal){
    throw new apiError(400, "No goal found")
  }
  if(title) goal.title = title
  if(subjects) goal.subjects.push(...subjects)
  if(description) goal.description = description
  if(dailystudyhours) goal.dailystudyhours = dailystudyhours
  if(status) goal.status = status
  if(deadline) goal.deadline = deadline

  if(subjects){
  const isValidSubject = await Subject.find({
    _id : {$in: subjects},
    user: req.user?._id
  })
  if(isValidSubject.length !== subjects.length){
    throw new apiError(400, "Invalid subjects");
  }
}
  const updatedGoal = await goal.save({validateBeforeSave:false});

  return res.status(200)
  .json(new apiResponse(200, updatedGoal, "Goal updated successfully"));
});
const deleteGoal = asyncHandler(async(req,res)=>{
  const {goalId} = req.params;
  if(!goalId){
    throw new apiError(400, "Goal id not found");
  }
  if(!req.user){
    throw new apiError(401, "Unauthorised user");
  }
  await Goal.findOneAndDelete({
    _id: goalId,
    user: req.user?._id
  });

  return res.status(200)
  .json(new apiResponse(200, null, "Goal deleted successfully"));
})
export {
  createGoal,
  getAllGoals,
  getSingleGoal,
  updateGoal,
  deleteGoal,
}