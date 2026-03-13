import mongoose from "mongoose";
const connectToDb = async()=>{
  const url = process.env.MONGODB_URI
 try {
   const connectionInstance = await mongoose.connect(`${url}/study-planner`);
   console.log(`mongo db connected : ${url}`)
 } catch (error) {
  console.log("DB connection failed");
  console.log(error);
  process.exit(1);
 }
}
export default connectToDb;