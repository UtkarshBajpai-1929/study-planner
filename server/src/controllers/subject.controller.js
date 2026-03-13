import { Subject } from "../models/subject.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSubject = asyncHandler(async(req,res)=>{
 try {
   const {name, difficulty, time} = req.body;
   if(!req.user || !name || !difficulty || !time){
     throw new apiError(400, "All fields are required");
   }
 
   const subject = await Subject.create({
     name,
     difficulty,
     time,
     user: req.user._id,
   });
 
   return res.status(201)
   .json(new apiResponse(201, subject, "Subject created successfully"));
 } catch (error) {
  console.log(error);
 }
});

const getAllSubject = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(401, "Unauthorised request");
  }

  const subject = await Subject.find({user: req.user._id});

  return res.status(200)
  .json(new apiResponse(200, subject, "Subjects fetched successfully"));
})

const getSingleSubject = asyncHandler(async(req,res)=>{
  if(!req.user){
    throw new apiError(400, "Unauthorised request");
  }
  const {subjectId} = req.params;
  const subject = await Subject.findOne({
    $and:[{_id: subjectId},{user: req.user._id}]
  });
  if(!subject){
    throw new apiError(400, "No subject found");
  }
  return res.status(200)
  .json(new apiResponse(200, subject, "Subject fetched"))
});

const updateSubject = asyncHandler(async(req,res)=>{
   if(!req.user){
    throw new apiError(400, "Unauthorised request");
  }
  const {subjectId} = req.params;
  const subject = await Subject.findOne({
    $and :[{user: req.user._id}, {_id: subjectId}]
  });
   if(!subject){
    throw new apiError(400, "No subject found");
  }
  const {name, time, difficulty} = req.body;
  if(time) subject.time = time;
  if(name) subject.name = name;
  if(difficulty) subject.difficulty = difficulty;
  const updatedSub = await subject.save({validateBeforeSave: false})

  return res.status(200)
  .json(new apiResponse(200, updatedSub,"sub updated" ))
})


const deleteSubject = asyncHandler(async(req, res)=>{
  if(!req.user){
    throw new apiError(400, "Unauthorised request");
  }
  const {subjectId} = req.params;
  await Subject.findOneAndDelete({
    $and: [{_id: subjectId}, {user: req.user._id}]
  });

  return res.status(200)
  .json(new apiResponse(200, null, "Subject deleted"));
})
export {
  createSubject,
  getAllSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};