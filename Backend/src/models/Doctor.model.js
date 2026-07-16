import mongoose, { Schema } from "mongoose";

const DoctorScheme = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index:true
    },
    licenseNumber: {
      type: string,
      required: true,
      unique: true,
      trim: true,
    },
    experience: {
      type: number,
      required: true,
      trim: true,
      min: 0,
      default: 0,
    },
    specialization: {
      type: string,
      required: true,
    },
    weekavalibility: {
      day: {
        type: string,
        enum: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
    },
    consultationFee: {
      type: number,
      min: 0,
      default: 0,
    },
    avatar:{
      type:string,
      required:true
    },
    startTime: {
      type: String,
      required: true,
      match: [
        /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
        "Time must be in 24h HH:MM format (e.g. 09:00 or 14:30)",
      ],
    },
    endtime: {
      type: string,
      required: true,
      match: [
        /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
        "Time must be in 24h HH:MM format (e.g. 09:00 or 14:30)",
      ],
    },
  },
  { timestamps: true },
);

export  const Doctor = mongoose.model("Doctor", DoctorScheme);
