import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyjwt =asyncHandler(async(req,res,next)=>{
try {
    const token = req.cookies?.accessToken;
    if(!token){
      throw new apiError(400, "Token not found");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken){
      throw new apiError(400, "Unauthorised user");
    }
  
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
  
    req.user = user;
  
    next();
} catch (error) {
  console.log(error);
  throw new apiError(500, "Unauthorised request");
}
});
export {verifyjwt};
