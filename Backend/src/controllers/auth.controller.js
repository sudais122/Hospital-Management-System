import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { Patient } from "../models/Patient.model.js";
import jwt from "jsonwebtoken";
import Nurse from "../models/Nurse.model.js";

//Register Function
const RegisterPatient = async (req, res) => {
  const {
    fullname,
    email,
    phone,
    role,
    password,
    DateOfBirth,
    bloodgroup,
    emergencyContact,
  } = req.body;
  const { name, Phone: emergencyphone, relation } = emergencyContact || {};

  if (emergencyphone === phone) {
    throw new ApiError("Emergenct conatct and contct must be different");
  }
  if (
    [fullname, email, phone, role, password, DateOfBirth, bloodgroup].some(
      (fields) => !fields.trim(),
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if ([relation, emergencyphone, name].some((fields) => !fields.trim())) {
    throw new ApiError(
      400,
      "Emergency contact name, phone and relation are required",
    );
  }

  const existingpatience = await User.exists({ $or: [{ email }, { phone }] });
  if (existingpatience) {
    throw new ApiError(409, "Email or phone number already Registred");
  }

  const user = await User.create({
    fullname,
    email,
    phone,
    role: "patient",
    password,
  });

  const patient = await Patient.create({
    user: user._id,
    DateOfBirth,
    bloodgroup,
    emergencyContact,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { user, patient }, "Registration successful"));
};

//login Function
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Verify password
  const passwordCorrect = await user.isPasswordCorrect(password);

  if (!passwordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  // If the user is a nurse, fetch nurse profile and assigned doctor
  let nurse = null;

  if (user.role === "nurse") {
    nurse = await Nurse.findOne({ user: user._id })
  }

  // Generate tokens
  const accessToken = user.genarteacesstoken();
  const refreshToken = user.genarterefreshtoken();

  // Save refresh token
  user.refreshtoken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  const now = new Date();

  return res
    .status(200)
    .cookie("acesstoken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
          nurse, // Will contain assigned doctor if the user is a nurse
          accessToken,
        },
        `${email} logged in successfully at ${now.toLocaleString()}`
      )
    );
};
//refreshacesstoken Function
const refreshacesstoken = async (req, res) => {
  const incomingtoken = req.cookie.refreshtoken;

  jwt.verify(incomingtoken, process.env.REFRESH_TOKEN_EXPIRY);

  const user = await User.findById(decode._id);

  if (incomingtoken != user.refreshtoken) throw new ApiError(401);

  const newrefreshtoken = user.genarterefreshtoken();
  const newaccesstoken = user.genarteacesstoken();

  user.refreshtoken = newrefreshtoken;

  await user.save({ validateBeforeSave: false });

  return res
    .cookie("acesstoken", newaccesstoken)
    .cookie("refreshtoken", newrefreshtoken);
};

//getcurrectuser Function
const getcurrectuser = async (req, res) => {
  res.json(new ApiResponse(200, req.user, "user fetched sucessfully"));
};

// logout functoin
const logout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
};

const updatepassowrd = async (req, res) => {
  const { oldpassword, newpassword } = req.body ?? {};

  if ([oldpassword, newpassword].some((f) => !f?.trim())) {
    throw new ApiError(400, "Old and new password are required");
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(oldpassword);
  if (!isValid) throw new ApiError(401, "Old password is incorrect");

  user.password = newpassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
};
export { RegisterPatient, login, refreshacesstoken, logout, getcurrectuser,updatepassowrd }
