import Comment from "../models/commentSchema.js";
import Post from "../models/post.Schema.js";
import User from "../models/userSchema.js";

export let CommentCreate = async (req, res) => {
  try {
    let logedinUserId = req.userId;
    let postId = req.params.id; // jis post per comments honge
    let { comment } = req.body;

    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }
    if (!postId || !comment) {
      return res.status(402).json({
        success: false,
        massage: "postId & comment is required",
      });
    }

    let user = await User.findById(logedinUserId)

    // comment create karo
    let createComment = await Comment.create({
      userId: logedinUserId,
      fullname: user.fullname,
      email: user.email,
      profilePhoto: user.profilePhoto,
      text: comment,
    });

    if (createComment) {
      // find the post
      let post = await Post.findByIdAndUpdate(postId, {
        $push: { comments: createComment._id },
      });
      await post.save();
    }

    // let findTheComment = await Comment.findById(createComment._id)

    return res.status(201).json({
      success: true,
      massage: "commentCreated Successfully",
      createComment,
    });
  } catch (error) {
    console.log(error);
  }
};

export let ShowAllComment = async (req, res) => {
  try {
    let logedinUserId = req.userId;
    let postId = req.params.id; // jis post ke comments nikaalne hai

    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }
    if (!postId) {
      return res.status(402).json({
        success: false,
        massage: "postid is required",
      });
    }

    let post = await Post.findById(postId).populate({ path: "comments" }); // populate kerna hai userId ko
    if (!post) {
      return res.status(400).json({
        massage: "postid is not matched",
        success: false
      });
    }

    return res.status(200).json(post)
  } catch (error) {
    console.log(error);
  }
};
