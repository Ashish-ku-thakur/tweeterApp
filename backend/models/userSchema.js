import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    gender: { type: String, require: true, enum: ["mail", "femail"] },
    profilePhoto: { type: String, default: "" },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    postLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
export default User;
