import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { Patient } from "../models/Patient.model.js";

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
  const { name, Phone: emergencyphone, relation } = emergencyContact;

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
    DateOfBirth,
    bloodgroup,
    emergencyContact,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, patient, "Registration successful"));

};


const login = async (req,res) =>{
    const {email,password} = req.body;

    const user = await User.finone({email});

    if(!user){
        throw new ApiError("invalid credentials")
    }

    const passwordcorrect = await User.ispasswordcorrect(password);

    if(!passwordcorrect){
        throw new ApiError('invalid password')
    }


  return res
    .status(201)
    .json(new ApiResponse(201, `${email} login sucessfully at ${now.toLocaleString()}`));
}
export {
    RegisterPatient,
    login 
};
