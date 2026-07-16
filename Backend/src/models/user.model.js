import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userschema = new Schema(
    {
        fullname:{
            type: String,
            required:true,
            index:true,
            trim:true
        },
        email: {
            type:String,
            require:true,
            unique:true,
            trim:true
        },
        phone:{
            type:String,
            trim:true,
            required: true,
            unique:true
        },
        role:{
            type: String,
            require:true,
            enum: ['doctor', "nurse" , "patient", "admin"]
        },
        password:{
            type:String,
            required:true,
        },
        refreshtoken:{
            type:String,
        }
    },{timestamps: true}
)

userschema.pre("save", async function () {
  if (!this.isModified("password")) return;   
  this.password = await bcrypt.hash(this.password, 10);
});
userschema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User",userschema)