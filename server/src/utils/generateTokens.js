import { User } from "../models/user.model.js";

const generateAccessRefreshToken = async (userId)=>{
try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {accessToken, refreshToken};
} catch (error) {
  throw new apiError(401, "Error while generating token");
}
}

export {generateAccessRefreshToken};