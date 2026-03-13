import mongoose, {Schema} from "mongoose";

const goalSchema = new Schema({
  title:{
    type: String,
    required:true,
    trim : true
  },
  description:{
    type: String,
    require: true,
  },
  subjects:[
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    }
  ],
  dailystudyhours:{
    type: Number,
    required: true
  },
  deadline: {
    type:Date,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  status:{
    type: String,
    enum: ["active", "paused", "completed"],
    default: "active"
  }
},{timestamps: true})

export const Goal = mongoose.model("Goal", goalSchema);