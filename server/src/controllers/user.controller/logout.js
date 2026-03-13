import { User } from "../../models/user.model.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


//user must have logged in to logout 
//to get user before reching this route
// use of middleware
const logoutUser = asyncHandler(async(req,res)=>{

  const user = await User.findByIdAndUpdate(req.user?._id, {
    $set:{
      refreshToken : undefined
    }
  })
  const options = {
    httOnly : true,
    secure: true
  }

  return res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new apiResponse(201, null, "Logged Out successfully"));
})

export {logoutUser};