import mongoose ,{Schema} from "mongoose";

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
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContact: {
      name: { type: String, required: true },
      Phone: { type: String, required: true, unique: true },
      relation: { type: String, required: true, default: "Brother" },
    },
  },
  { timestamps: true },
);

export const Patient = mongoose.model("Patient", PatientSchema);
