import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "confirmed", "Completed", "cancelled"],
      index: true,
    },
  },
  { timestamps: true },
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
