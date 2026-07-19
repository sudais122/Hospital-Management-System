import { User } from "../models/User.model.js";
import Nurse from "../models/Nurse.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addnurse = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      role,
      password,
      licenseNumber,
      department,
      ward,
      shift,
      qualification,
      assignedDoctors,
    } = req.body;

    if (
      [
        fullname,
        email,
        password,
        role,
        phone,
        licenseNumber,
        department,
        ward,
        shift,
        qualification,
        assignedDoctors,
      ].some((fields) => !fields)
    )
      throw new ApiError(400, "All fields are required");

      console.log("request received")
    const user = await User.create({
      fullname,
      email,
      phone,
      password,
      role: "nurse",
    });

    console.log("user created");

    const nurse = await Nurse.create({
      user: user._id,
      licenseNumber,
      department,
      ward,
      shift,
      qualification,
      assignedDoctors,
    });

    console.log("nurse created");
    return res.json(
      new ApiResponse(200, { user, nurse }, "Nurse added sSuccessfully"),
    );
  } catch (error) {
    return res.json(new ApiError(500, error.message));
  }
};
export { addnurse };
