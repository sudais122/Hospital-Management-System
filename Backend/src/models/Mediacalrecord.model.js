import mongoose, { Schema } from "mongoose";

const MedicalrecordSchema = new Schema(
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
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    percriptionpicurl: {
      type: string, //url come the cloudnary
      required: true,
    },
    followupdate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const medicalrecord = mongoose.model(
  "medicalrecord",
  MedicalrecordSchema,
);
