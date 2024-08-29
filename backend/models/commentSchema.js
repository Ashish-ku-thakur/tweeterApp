import mongoose from "mongoose";

let commentSchema = new mongoose.Schema(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    fullname:String,
    email:String,
    profilePhoto:String,
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

let Comment = mongoose.model("Comment", commentSchema);
export default Comment;
