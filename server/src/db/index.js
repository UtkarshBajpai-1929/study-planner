import mongoose from "mongoose";

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Add it to your environment variables."
    );
  }

  let parsedUri;

  try {
    parsedUri = new URL(uri);
  } catch (err) {
    throw new Error(
      "Invalid MONGODB_URI format. Check your MongoDB Atlas connection string."
    );
  }

  // Add default database name if missing
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

const connectToDb = async () => {
  try {
    const mongoUri = getMongoUri();

    console.log("Connecting to MongoDB...");
    console.log(`Host: ${getSafeHost(mongoUri)}`);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB connected successfully: ${getSafeHost(mongoUri)}`
    );
  } catch (error) {
    console.error("❌ DB connection failed");

    // Full error log for debugging
    console.error(error);

    // Better custom messages
    if (
      error.code === "ENOTFOUND" ||
      error.message.includes("ENOTFOUND")
    ) {
      console.error(
        "MongoDB hostname not found. Check your Atlas cluster URL in MONGODB_URI."
      );
    }

    if (
      error.code === "ESERVFAIL" ||
      error.message.includes("ESERVFAIL")
    ) {
      console.error(
        "DNS resolution failed. Check your internet or hosting DNS support."
      );
    }

    if (error.message.includes("bad auth")) {
      console.error(
        "Authentication failed. Check MongoDB username/password."
      );
    }

    process.exit(1);
  }
};

export default connectToDb;