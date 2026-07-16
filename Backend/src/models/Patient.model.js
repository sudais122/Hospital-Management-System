import mongoose from "mongoose";

const PatientSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    bloodgroup: {
      type: string,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContact: {
      name: { type: string, required: true },
      phone: { type: string, required: true, unique: true },
      relation: { type: string, required: true, default: "Brother" },
    },
  },
  { timestamps: true },
);

export const Patient = mongoose.model("Patient", PatientSchema);
