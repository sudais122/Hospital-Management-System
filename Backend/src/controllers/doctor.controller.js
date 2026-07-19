import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { Doctor } from "../models/Doctor.model.js";
import {uploadfile} from '../utils/cloudnary.js'

const adddoctor = async (req, res) => {
  const {
    fullname,
    phone,
    password,
    licenseNumber,
    experience,
    specialization,
    weekavalibility,
    consultationFee,
    startTime,
    endtime,
  } = req.body ?? {};
  const email = req.body?.email?.trim().toLowerCase();

  const stringFields = [
    fullname,
    email,
    phone,
    password,
    licenseNumber,
    specialization,
    weekavalibility,
    startTime,
    endtime,
  ];

  if (stringFields.some((field) => !field?.trim())) {
    throw new ApiError(400, "All string fields are required");
  }

  if (experience == null || consultationFee == null) {
    throw new ApiError(400, "Experience and consultation fee are required");
  }

  const existinguser = await User.exists({ $or: [{ email }, { phone }] });
  if (existinguser) {
    throw new ApiError(409, "Email or phone number already registered");
  }

  // 4. Avatar — OPTIONAL: upload only if a file was sent,
  const avatarLocalPath = req.file?.path;
  let avatar = null;

  if (avatarLocalPath) {
    avatar = await uploadfile(avatarLocalPath);
    if (!avatar) {
      throw new ApiError(500, "Failed to upload avatar");
    }
  }

  // 5. Create the auth user (role hardcoded)
  const user = await User.create({
    fullname,
    email,
    phone,
    role: "doctor",
    password,
  });

  // 6. Create the doctor profile — rollback the user if it fails
  let doctor;
  try {
    doctor = await Doctor.create({
      user: user._id,
      licenseNumber,
      experience,
      specialization,
      avatar: avatar?.secure_url || "",
      weekavalibility,
      consultationFee,
      startTime,
      endtime,
    });
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw new ApiError(500, "Failed to create doctor profile: " + error.message);
  }

  const safeUser = await User.findById(user._id).select("-password -refreshtoken");

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: safeUser, doctor }, "Doctor created successfully"),
    );
};

export {adddoctor}