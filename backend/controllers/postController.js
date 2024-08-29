import Comment from "../models/commentSchema.js";
import Post from "../models/post.Schema.js";
import User from "../models/userSchema.js";

export let CreatePost = async (req, res) => {
  try {
    let text = req.body.text;
    let logedinUserId = req.userId;


    if (!text) {
      return res.status(402).json({
        success: false,
        massage: "text is required",
      });
    }
    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }

    let user = await User.findById(logedinUserId);

    // create the post
    let postCreated = await Post.create({
      senderId: logedinUserId,
      fullname: user.fullname,
      profilePhoto: user.profilePhoto,
      email: user.email,
      massage: text,
    });

    if (!postCreated) {
      return res.status(402).json({
        success: false,
        massage: "somthing went wrong on post created",
      });
    }

    let post = await Post.findById(postCreated._id)

    if (user) {
      if (!user.posts.includes(postCreated._id)) {
        // push
        let appendPost = user.posts.push(postCreated._id);
        await user.save();

        return res.status(201).json({
          massage: "post created",
          success: true,
          postCreated: post,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export let LikePost = async (req, res) => {
  try {
    let logedinUserId = req.userId;
    let postId = req.params.id;

    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }
    if (!postId) {
      return res.status(402).json({
        success: false,
        massage: "postId is required",
      });
    }

    // find that particular post
    let findThePost = await Post.findById(postId);

    if (findThePost) {
      if (!findThePost.likes.includes(logedinUserId)) {
        // push
        let appendtheId = findThePost.likes.push(logedinUserId);
        await findThePost.save();

        // user me bhi push kerna hai or nikaalna hai
        let user = await User.findById(logedinUserId);
        if (user) {
          if (!user.postLikes.includes(findThePost._id)) {
            // push
            let appendPost = user.postLikes.push(findThePost._id);
            await user.save();
          }
        }

        return res.status(201).json({
          massage: "like the post",
        });
      } else {
        // pull
        let poptheId = await Post.findByIdAndUpdate(postId, {
          $pull: { likes: logedinUserId },
        });

        await findThePost.save();

        let user = await User.findByIdAndUpdate(logedinUserId, {
          $pull: { postLikes: findThePost._id },
        });

        return res.status(200).json({
          massage: "dislike the post",
        });
      }
    }

    // post ke like me push karo aapni id
  } catch (error) {
    console.log(error);
  }
};

export let GetAllPost = async (req, res) => {
  try {
    let logedinUserId = req.userId;

    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }

    let user = await User.findById(logedinUserId).populate({ path: "posts" });

    if (!user) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export let GetFollowerPosts = async (req, res) => {
  try {
    let logedinUserId = req.userId;

    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }

    let allPost = []

    let user = await User.findById(logedinUserId)
      .select("-password")
      .populate({
        path: "followings",
        populate: {
          path: "posts"
        }
      });



    let userPost = await User.findById(logedinUserId).populate({ path: "posts", select: "-password" })

    userPost.posts.forEach((el) => {
      allPost.push(el)
    })


    user.followings.forEach((el) => {
      el.posts.forEach((po) => {
        allPost.push(po)
      })
    })


    if (!user) {
      return res.status(402).json({
        success: false,
        massage: "userId is not match",
      });
    }

    return res.status(200).json(allPost);
  } catch (error) {
    console.log(error);
  }
};

export let DeleteThePost = async (req, res) => {
  try {
    let logedinUserId = req.userId;
    let postId = req.params.id; // jise hume delete kerna hai

    if (!logedinUserId) {
      return res.status(402).json({
        success: false,
        massage: "userId is required",
      });
    }
    if (!postId) {
      return res.status(402).json({
        success: false,
        massage: "postId is required",
      });
    }
    let findPost = await Post.findById(postId);

    if (!findPost) {
      return res.status(400).json({
        massage: "something went wrong on post delete",
        success: false,
      });
    }
    // comment ko bhi delete kerna hai lelated findPost
    await Promise.all(
      findPost?.comments?.map(async (ids) => {
        let findComment = await Comment.findByIdAndDelete(ids)
      })
    )
    await findPost.save()

    //find post and delete
    let post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(400).json({
        massage: "something went wrong on post delete",
        success: false,
      });
    }

    let user = await User.findByIdAndUpdate(logedinUserId, {
      $pull: { posts: postId },
    });
    await user.save()

    //postlikes mese bhi pull kerna hai
    if (user.postLikes.includes(postId)) {
      user = await User.findByIdAndUpdate(logedinUserId, {
        $pull: { postLikes: postId },
      });

      await user.save();
    }

    //bookmarks mese bhi pull kerna hai
    if (user.bookmarks.includes(postId)) {
      user = await User.findByIdAndUpdate(logedinUserId, {
        $pull: { bookmarks: postId },
      });

      await user.save();
    }

    return res.status(202).json({
      massage: "post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
