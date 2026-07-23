import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/Appointment.models.js";
import { Patient } from "../models/Patient.model.js";
import { User } from "../models/User.model.js";
import { populate } from "dotenv";

const bookAppointment = async (req, res) => {
  const { doctor, appointmentDate } = req.body;

  const patient = await Patient.findOne({
    user: req.user._id,
  });

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const appointment = await Appointment.create({
    patient: patient._id,
    doctor,
    appointmentDate,
  })
    const populateappointment =  await Appointment.findById(appointment._id).
    populate({
      path: "doctor",
      select: "specialization weekavalibility consultationFee startTime endtime",
      populate: {
        path: "user",
        select: "fullname email phone"
      },
    })
    .populate({
      path: "patient",
      select: "fullname email phone bloodgroup",
      populate: {
        path: "user",
        select: "fullname email phone"
      },
    });

  return res
    .status(201)
    .json(new ApiResponse(201, populateappointment, "Appointment booked successfully"));
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
    const doctor = await doctor.findOne({ user: req.user._id });

    const appointments = await Appointment.find({
      doctor: doctor._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, appointments, "Appointments fetched"));
  }
};
export {
  bookAppointment,
  conformedStstus,
  CompletedStstus,
  CancellStstus,
  getmyappointments,
};
