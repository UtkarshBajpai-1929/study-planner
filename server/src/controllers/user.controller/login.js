import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAccessRefreshToken } from "../../utils/generateTokens.js";
const loginUser = asyncHandler(async(req,res)=>{
  const {username, password} = req.body;
  if(!username || !password){
    throw new apiError(400, "Both fields are required");
  }

 const user =  await User.findOne({username});
 if(!user){
  throw new apiError(400, "User doesn't exist");
 }

 const isPasswordCorrect = await user.isPasswordCorrect(password);
 if(!isPasswordCorrect){
  throw new apiError(400, "Password is wrong");
 }

 const {accessToken, refreshToken} = await generateAccessRefreshToken(user._id);
 const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
 const options =  {
  httpOnly: true,
  secure: true
 }

 return res.status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json(new apiResponse(201, {user: loggedInUser}, "user logged in successfully"))
}
)
export {loginUser}