import express from "express";
import {GetFollowerPosts, 
  CreatePost,
  DeleteThePost,
  GetAllPost,
  LikePost,
} from "../controllers/postController.js";
import { isAuth } from "../middelware/authentication.js";

let router = express.Router();

router.route("/postCreate").post(isAuth, CreatePost);
router.route("/allPost").get(isAuth, GetAllPost);
router.route("/likeOrDislike/:id").patch(isAuth, LikePost);
router.route("/deletePost/:id").delete(isAuth, DeleteThePost);
router.route("/getFollowersPost").get(isAuth, GetFollowerPosts);

export default router;
