import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
      index: true,
    },
  },
  { timestamps: true },
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);