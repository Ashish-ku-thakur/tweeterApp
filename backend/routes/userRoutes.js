import express from "express";
import {
  FollowTheUser,
  GetAllUser,
  Login,
  Logout,
  Register,
  UnFollowTheUser,
} from "../controllers/userController.js";
import { isAuth } from "../middelware/authentication.js";

let router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/allUser").get(isAuth, GetAllUser);
router.route("/follow/:id").patch(isAuth, FollowTheUser);
router.route("/unfollow/:id").patch(isAuth, UnFollowTheUser);
export default router;
