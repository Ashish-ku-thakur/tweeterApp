import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import databaseConnection from "./middelware/database.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config({});

let app = express();

let corsOption = {
  origin:`${process.env.URL}`,
  credentials:true
}

// middelwares
app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

app.listen(process.env.PORT, () => {
  databaseConnection();
  console.log(`server started on ${process.env.PORT}`);
});
