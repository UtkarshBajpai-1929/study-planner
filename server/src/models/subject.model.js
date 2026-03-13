import mongoose, { Schema} from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty:{
    type: String,
    enum: ["Hard","Medium","Easy"],
    required: true
  },
  time:{
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},{timestamps:true});

export const Subject = mongoose.model("Subject", subjectSchema);