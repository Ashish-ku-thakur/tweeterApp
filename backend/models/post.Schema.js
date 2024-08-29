import mongoose from "mongoose";

let postSchame = new mongoose.Schema(
  {
    senderId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    }],

    fullname: String,
    email: String,
    profilePhoto:String,
    massage: { type: String, require: true },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

let Post = mongoose.model("Post", postSchame);
export default Post;
