import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/Appointment.models.js";
import { User } from "../models/User.model.js";

const bookapointment = async (req, res) => {
  const userid = req.params.id;

  const { doctor, status } = req.body;

  const patient = await User.findOne({ userid });

  if (!patient) throw new ApiError("Patien not found");

  const appointment = await Appointment.create({
    user: patient._id,
    doctor,
    status: "Pending",
  });

  if (!appointment)
    throw new ApiError("something went wrong while booking appointment");

  return res.json(new ApiResponse(200, "Apoointment Sucessfull", appointment));
};

const conformedStstus = async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status: "Confirmed" },
    { new: true },
  );

  if (!appointment) throw new ApiError("Appointmen not found");

  return res.json(new ApiResponse(200, "Appointment confirmed successfully"));
};

const CompletedStstus = async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status: "Completed" },
    { new: true },
  );

  if (!appointment) throw new ApiError("Appointmen not found");

  return res.json(new ApiResponse(200, "Appointment completed successfully"));
};

const CancellStstus = async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status: "Cancelled" },
    { new: true },
  );

  if (!appointment) throw new ApiError("Appointmen not found");

  return res.json(new ApiResponse(200, "Appointment Cancelled successfully"));
};

const getmyappointments = async (req, res) => {
  if (req.user.role === "patient") {
    const patient = await Patient.findOne({ user: req.user._id });

    const appointments = await Appointment.find({
      patient: patient._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, appointments, "Appointments fetched"));
  }

  if (req.user.role === "doctor") {
    const doctor = await Doctor.findOne({ user: req.user._id });

    const appointments = await Appointment.find({
      doctor: doctor._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, appointments, "Appointments fetched"));
  }
};
export { bookapointment, conformedStstus, CompletedStstus, CancellStstus,getmyappointments };
