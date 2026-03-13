import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyjwt = asyncHandler(async (req, res, next) => {
  try {

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new apiError(401, "Invalid token");
    }

    req.user = user;

    next();

  } catch (error) {
    console.log(error);
    throw new apiError(401, "Unauthorised request");
  }
});

export { verifyjwt };