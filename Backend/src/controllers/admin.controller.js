import { Doctor } from "../models/Doctor.model.js"
import { Patient } from "../models/Patient.model.js"
import { User } from "../models/User.model.js"
import Nurse from "../models/Nurse.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Appointment } from "../models/Appointment.models.js"
import jwt from "jsonwebtoken";

const getAllDoctor = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json(
        new ApiError(403, "Unauthorized access")
      );
    }

    const doctors = await Doctor.find();

    if (doctors.length === 0) {
      throw new ApiError(404, "No doctors found");
    }

    return res.status(200).json(
      new ApiResponse(200, doctors, "Doctors fetched successfully")
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error"
      )
    );
  }
};


const getAllNurses = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json(
        new ApiError(403, "Unauthorized access")
      );
    }

    const nurse = await Nurse.find();

    if (nurse.length === 0) {
      throw new ApiError(404, "No nurse found");
    }

    return res.status(200).json(
      new ApiResponse(200, nurse, "Doctors fetched successfully")
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error"
      )
    );
  }
};

const getAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json(
        new ApiError(403, "Unauthorized access")
      );
    }

    const appointment = await Appointment.find();

    if (appointment.length === 0) {
      throw new ApiError(404, "No appointment found");
    }

    return res.status(200).json(
      new ApiResponse(200, appointment, "appointment fetched successfully")
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json(
      new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error"
      )
    );
  }
};

const adminLogin = (async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        throw new ApiError(401, "Invalid admin credentials");
    }

    const accessToken = jwt.sign(
        {
            role: "admin",
            email: process.env.ADMIN_EMAIL,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    admin: {
                        email: process.env.ADMIN_EMAIL,
                        role: "admin",
                    },
                },
                "Admin logged in successfully"
            )
        );
});

export {getAllDoctor,getAllNurses,getAllAppointments,adminLogin}

