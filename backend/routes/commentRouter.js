import express from "express";
import {
  CommentCreate,
  ShowAllComment,
} from "../controllers/commentController.js";
import { isAuth } from "../middelware/authentication.js";

let router = express.Router();

router.route("/commentCreate/:id").post(isAuth, CommentCreate);
router.route("/showAllComment/:id").get(isAuth, ShowAllComment);

export default router;
