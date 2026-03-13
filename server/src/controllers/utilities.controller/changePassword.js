import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const changePassword = asyncHandler(async(req,res)=>{

  const {oldPassword, newPassword} = req.body;
  if(!newPassword){
    throw new apiError(400, "Provide the new password");
  }
  if(oldPassword === newPassword){
    throw new apiError(400, "same as old password");
  }
  const user = await User.findById(req.user?._id).select("-password -refreshToken");
  if(!user.isPasswordCorrect(oldPassword)){
    throw new apiError(400, "Enter correct old password");
  }
  user.password = newPassword;
  await user.save({validateBeforeSave: false})
  return res.status(200)
  .json(new apiResponse(201, user, "password updated"));
});

export {changePassword};