import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const uploadImage = asyncHandler(async(req,res)=>{
  if(req.files.profile.length <=0){
    throw new apiError(400, "Provide the file");
  }
  const localPath = req.files?.profile[0].path;

  if(!localPath){
    throw new apiError(400, "Localpath is not available to serve in cloudinary")
  }
  const profile = await uploadOnCloudinary(localPath);
  console.log(profile);

  if(!profile){
    throw new apiError(400, "Uploading failed on cloudinary");
  }

  const user = await User.findById(req.user?._id).select("-password -refreshToken");
  if(!user){
    throw new apiError(400, "user not found");
  }
  user.profile = profile.url;
  await user.save({validateBeforeSave:false});

  return res.status(200)
  .json(new apiResponse(201, user, "Profile pic uploaded"));
})
export {uploadImage};