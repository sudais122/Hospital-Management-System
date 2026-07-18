import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { Patient } from "../models/Patient.model.js";
import jwt from "jsonwebtoken";

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

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("invalid credentials");
  }

  const passwordcorrect = await user.isPasswordCorrect(password);

  if (!passwordcorrect) {
    throw new ApiError("invalid password");
  }

  //step 1 generate tokens
  const acesstoken = user.genarteacesstoken();
  const refreshtoken = user.genarterefreshtoken();

  //step 2 update token in dabatase
  user.refreshtoken = refreshtoken;

  //step 3
  await user.save({ validateBeforeSave: false });

  // step 4 craete options for security purpose
  const options = {
    httpOnly: true,
    secure: true,
  };

  const now = new Date();

  //step 5 send it in cookie
  return res
    .status(201)
    .cookie("acesstoken", acesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
      new ApiResponse(
        201,
        {user,acesstoken},
        `${email} login sucessfully at ${now.toLocaleString()}`,
      ),
    );
};

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

const getcurrectuser = async (req, res) => {
  res.json(new ApiResponse(200, req.user, "user fetched sucessfully"));
};

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
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "User logged out successfully"
      )
    );
};
export { RegisterPatient, login, refreshacesstoken, logout, getcurrectuser };
