import mongoose, { Schema } from "mongoose";

const NurseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
      index: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    department: {
      type: String,
      default: "ICU",
      trim: true,
    },
    ward: {
      type: String,
      trim: true,
    },
    shift: {
      type: String,
      enum: ["morning", "evening", "night"],
      default: "morning",
    },
    qualification: {
      type: String,
      required: true,
      trim: true,
    },
    assignedDoctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  { timestamps: true },
);

const Nurse = mongoose.model("Nurse", NurseSchema);

export default Nurse;