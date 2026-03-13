import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
const dayScheduleSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  tasks: [taskSchema]
});
const studyPlanSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  goal:{
    type: Schema.Types.ObjectId,
    ref: "Goal",
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate:{
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "paused", "completed"],
    required: true,
    default: "active"
  },
  schedule:[dayScheduleSchema]
},{timestamps: true});

export const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);