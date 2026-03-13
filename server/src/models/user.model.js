import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
  },
    fullname: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: [true, "Password is required"],
  },
    refreshToken: {
    type: String,
    
  },
  profile: {
    type:String,
  }
},{timestamps:true});

//password is changed :
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next;
});

userSchema.pre("save", async function (next) {
  if(!this.isModified("profile")){
    return next;
  }
  this.profile = this.profile;
  next;
})

//methods:

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken =  function(){
 return jwt.sign({
  _id : this._id
 },
   process.env.ACCESS_TOKEN_SECRET,
 {
  expiresIn: process.env.ACCESS_TOKEN_EXPIRY
 })
}
userSchema.methods.generateRefreshToken = function (){
  return jwt.sign({
    _id : this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  })
}
export const User = mongoose.model("User", userSchema);