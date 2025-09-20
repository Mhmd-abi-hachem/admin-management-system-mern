import { promisify } from "util";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import resetAndSeedDB from "../seeder.js";

// Create a token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // To convert it to milliseconds
    ),
    httpOnly: true,
    sameSite: "none",
  };

  // for dev
  if (process.env.NODE_ENV === "development") {
    cookieOptions.sameSite = "lax";
    cookieOptions.secure = false;
  }

  // for prod
  if (process.env.NODE_ENV === "production") {
    cookieOptions.sameSite = "none";
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  // !! Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError("All fields are required", 400));
  }

  // Create the user
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) reset the db (so everone who wants to test my app should have same initial data)
  await resetAndSeedDB();

  // 4) refetch the user to get a fresh user object from the clean database
  const freshUser = await User.findOne({ email }).select("+password");

  // 5) If everything is ok --> send token to the client
  createSendToken(freshUser, 200, res);
});

// Middleware function to protect routes
export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You're not logged in! Please login to get access.", 401)
    );
  }
  // 2) Validate token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The User belonging to this token does no longer exist.",
        401
      )
    );
  }
  // 4) Check if user changed password after token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }

  // Grant access to protected route
  req.user = freshUser;
  next();
});

// Check if user is loggedIn (note: this middleware will run on every single req on our website unlike protect middleware)
export const isLoggedIn = async (req, res, next) => {
  // Note that no error to be thrown here in this fn
  if (req.cookies.jwt) {
    try {
      // 1) Veriy token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );

      // 2) check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // There is logged in User
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

// Sends the authentication status (loggedIn:false/true) and user info (if logged in)
export const getLoginStatus = (req, res) => {
  if (!req.user) {
    return res.status(200).json({ isLoggedIn: false });
  }

  res.status(200).json({
    isLoggedIn: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    },
  });
};

export const logout = async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  // for dev
  if (process.env.NODE_ENV === "development") {
    cookieOptions.sameSite = "lax";
    cookieOptions.secure = false;
  }
  // for prod
  if (process.env.NODE_ENV === "production") {
    cookieOptions.sameSite = "none";
    cookieOptions.secure = true;
  }

  res.cookie("jwt", "loggedout", cookieOptions);
  res.status(200).json({ status: "success" });
};

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 3) Log user in, send JWT
  createSendToken(user, 200, res);
});
