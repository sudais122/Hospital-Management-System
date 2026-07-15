import mongoose, { Schema } from "mongoose";

const NurseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    licenseNumber: {
      type: string,
      required: true,
      unique: true,
    },
    department: {
      type: string,
      default: "ICU",
    },
    ward: {
      type: String,
    },
    shift: {
      type: string,
      enum: ["morning", "evening", "night"],
      default: "morning",
    },
    qualification: {
      type: string,
      required: true,
    },
    assignedDoctors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true },
);

export default Nurse = mongoose.Schema("Nurse", NurseSchema);
