import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPwd = bcrypt.hashSync(password, 10);

  const newUser = new User({ name, email, password: hashedPwd });

  try {
    await newUser
      .save()
      .then((user) => {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pwd, ...rest } = user._doc;
        res
          .cookie("access_token", token, {
            // httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json(rest);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    next(errorHandler(409, "User Already Exists"));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
    const { password: pwd, ...others } = user._doc;
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      res
        .cookie("access_token", token, { secure: true })
        .status(200)
        .json(others);
    });
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          // httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newUser = new User({
        name: username,
        email: req.body.email,
        password: hashedPassword,
        img: req.body.img,
      });
      await newUser
        .save()
        .then((user) => {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          const { password: pwd, ...rest } = user._doc;
          res
            .cookie("access_token", token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json(rest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    next(err);
  }
};
// Logout User
export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been Logged out");
  } catch (error) {
    next(error);
  }
};
