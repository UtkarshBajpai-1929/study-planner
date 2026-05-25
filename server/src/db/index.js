import mongoose from "mongoose";

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to your deployment environment variables.");
  }

  const parsedUri = new URL(uri);
  if (!parsedUri.pathname || parsedUri.pathname === "/") {
    parsedUri.pathname = "/study-planner";
  }

  return parsedUri.toString();
};

const getSafeHost = (uri) => {
  try {
    return new URL(uri).host;
  } catch {
    return "unknown MongoDB host";
  }
};

const connectToDb = async()=>{
 try {
   const mongoUri = getMongoUri();
   await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000
   });
   console.log(`MongoDB connected: ${getSafeHost(mongoUri)}`);
 } catch (error) {
  console.log("DB connection failed");
  console.log(error.message);
  if (error.code === "ENOTFOUND" || error.code === "ESERVFAIL") {
    console.log("Check that MONGODB_URI uses the exact hostname from MongoDB Atlas and that the deployment platform can resolve DNS SRV records.");
  }
  process.exit(1);
 }
}
export default connectToDb;
