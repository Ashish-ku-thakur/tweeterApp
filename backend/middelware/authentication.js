import jwt from "jsonwebtoken";

export let isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.uid;
    // console.log(loginUserId);

    if (!token) {
      return res.status(403).json({
        massage: "you are not authenticated",
        success: false,
      });
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(403).json({
        massage: "you are not authenticated",
        success: false,
      });
    }

    req.userId = decode.userId

    next()
  } catch (error) {
    console.log(error);
  }
};
