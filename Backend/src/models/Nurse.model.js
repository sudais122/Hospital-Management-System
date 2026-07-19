import mongoose, { Schema } from "mongoose";

const NurseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      default: "ICU",
    },
    ward: {
      type: String,
    },
    shift: {
      type: String,
      enum: ["morning", "evening", "night"],
      default: "morning",
    },
    qualification: {
      type: String,
      required: true,
    },
    assignedDoctors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true },
);

const Nurse = mongoose.model("Nurse", NurseSchema);

export default Nurse;