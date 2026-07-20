import { User } from "../models/User.model.js";
import Nurse from "../models/Nurse.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { updatedoctor } from "./doctor.controller.js";

const addnurse = async (req, res) => {
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

      const extinguser = await User.exists({$or: [{phone},{email}]})

      if(extinguser) throw new ApiError(400,"email or email already exist")

    const user = await User.create({
      fullname,
      email,
      phone,
      password,
      role: "nurse",
    });

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
};

const updatenurse = async(req,res) =>{
    const userid = req.params.id;

    const {
      fullname,
      email,
      phone,
      licenseNumber,
      department,
      ward,
      shift,
      qualification,
      assignedDoctors,
    } = req.body;

    const allowefield = req.body;

    if(allowefield.password || allowefield.role) 
      throw new ApiError("Password and role are not allowed to edit")

    const updatednurse = await User.findOneAndUpdate(
      userid,
      {allowefield},
      {new: true}
    )

    if(!updatenurse) throw new ApiError("Nurse not found")

    return res.json(
      new ApiResponse(200,{updatednurse},"Nurse Updated sucessfully")
    )

}
const deletenurse = async(req,res) =>{
  const userid = req.params.id;

  const user = await User.deleteOne({userid});
  if(!user) throw new ApiError("user not found")
  
  return res.json(
    new ApiResponse(200,"Nurse deletdd sucessfully")
  )
}
export { addnurse ,deletenurse, updatenurse};
