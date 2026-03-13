import { User } from "../../models/user.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
export const registerUser = asyncHandler(async(req,res)=>{
try {
    const{username, fullname, password, email } = req.body;
    if(!username || !fullname || !password || !email){
      throw new apiError(401, "All fields are required");
    }
    //if user already exists
    const existedUser = await User.findOne({
      $or: [{username},{email}]
    });
    if(existedUser){
      throw new apiError(400, "user already exists");
    }
    const user = await User.create({
      username,
      fullname,
      email,
      password,
    });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
      throw new apiError(500, "Something went wron while creating user");
    }
    return res.status(201).json( new apiResponse(200,createdUser, "user registered"));
} catch (error) {
  console.log(error);
}
}
)