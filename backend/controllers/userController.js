import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export let Register = async (req, res) => {
  try {
    let { fullname, email, password, gender } = req.body;
    

    
    // basic validation
    if (!fullname || !email || !password || !gender) {
      return res.status(400).json({
        massage: "All fields are required",
        success: false,
      });
    }

    // check user already exist or not
    let isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res.status(400).json({
        massage: "This email is already exist please enter a new email",
        success: false,
      });
    }

    // photogenrate
    let mailProfile = `https://avatar.iran.liara.run/public/boy?fullname=${fullname}`;
    let femailProfile = `https://avatar.iran.liara.run/public/girl?fullname=${fullname}`;

    // password
    let hashPassword = await bcryptjs.hash(password, 10);

    // then create
    let createUser = await User.create({
      fullname,
      email,
      password: hashPassword,
      gender,
      profilePhoto: gender == "mail" ? mailProfile : femailProfile,
    });

    let user = await User.findById({ _id: createUser._id }).select("-password");

    return res.status(200).json({
      massage: "new User created",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export let Login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({
        massage: "All fields are required",
        success: false,
      });
    }

    let findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        massage: "email and password is not correct",
        success: false,
      });
    }

    // match the password
    let isMatchPassword = await bcryptjs.compare(password, findUser.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        massage: "password and email is not correct",
        success: false,
      });
    }

    // is user correct then send a cookie to verified
    let check = {
      userId: findUser._id,
    };

    let token = jwt.sign(check, process.env.JWT_SECRET);

    // this is for sending inside the frontend
    let createdUser = await User.findOne({ email }).select("-password");

    return res
      .status(200)
      .cookie("uid", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // sameSite: "strict",
      })
      .json({
        massage: `welcome bace ${findUser.fullname}`,
        success: true,
        createdUser,
      });
  } catch (error) {
    console.log(error);
  }
};

export let Logout = async (req, res) => {
  try {
    return res.status(200).cookie("uid", "", { maxAge: 0 }).json({
      massage: "logout user successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export let GetAllUser = async (req, res) => {
  try {
    let logedinUserId = req.userId;

    if (!logedinUserId) {
      return res.status(400).json({
        massage: "userId is required",
        success: false,
      });
    }

    // ise userid ko chor ker baaki sari userid
    let otherUsers = await User.find({
      _id: { $ne: { _id: logedinUserId } },
    }).limit(20);

    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};

export let FollowTheUser = async (req, res) => {
  try {
    let logedinUserId = req.userId;
    let followUserId = req.params.id; // jise hum follow kerna chahate hai

    if (!logedinUserId) {
      return res.status(400).json({
        massage: "userId is required",
        success: false,
      });
    }
    if (followUserId == undefined) {
      return res.status(400).json({
        massage: "followUserId is required",
        success: false,
      });
    }

    let user = await User.findById(logedinUserId);

    if (!user.followings.includes(followUserId)) {
      await User.findByIdAndUpdate(logedinUserId, {
        $push: { followings: followUserId },
      });

      await user.save();
    }

    user = await User.findById(followUserId);
    if (!user.followers.includes(logedinUserId)) {
      await User.findByIdAndUpdate(followUserId, {
        $push: { followers: logedinUserId },
      });

      await user.save();
    }

    return res.status(202).json({user, massage:"succesfully follow", success:true});
  } catch (error) {
    console.log(error);
  }
};

export let UnFollowTheUser = async (req, res) => {
  try {
    let logedinUserId = req.userId;
    let followUserId = req.params.id; // jise hum unfollow kerna chahate hai

    if (!logedinUserId) {
      return res.status(400).json({
        massage: "userId is required",
        success: false,
      });
    }
    if (followUserId == undefined) {
      return res.status(400).json({
        massage: "followUserId is required",
        success: false,
      });
    }

    let user = await User.findById(logedinUserId);

    if (user.followings.includes(followUserId)) {
      await User.findByIdAndUpdate(logedinUserId, {
        $pull: { followings: followUserId },
      });

      await user.save();
    }

    user = await User.findById(followUserId);
    if (user.followers.includes(logedinUserId)) {
      await User.findByIdAndUpdate(followUserId, {
        $pull: { followers: logedinUserId },
      });

      await user.save();
    }

    return res.status(202).json({user, massage:"succesfully unfollow", success:true});
  } catch (error) {
    console.log(error);
  }
};
