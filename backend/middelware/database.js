import mongoose from "mongoose";

let databaseConnection = async () => {
  let dbConnection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/tweeter"
  );

  if (!dbConnection) {
    console.log("dbConnected is not connected");
  } else {
    console.log("dbConnected is connected");
  }
};
export default databaseConnection;
