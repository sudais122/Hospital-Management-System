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
        roles:{
            type: String,
            require:true,
            enum: ['doctor', "nurse" , "patient", "admin"]
        },
        password:{
            type:String,
            required:true,
            select: false
        },
        refreshtoken:{
            type:String,
            select:false
        }
    },{timestamps: true}
)

userschema.pre('save', async ()=>{
    if(!password.isModified('password')) return next;

    this.password = await bcrypt.hash(this.password)
})

userschema.method.ispasswordcorrect = async (password) =>{
    return await bcrypt.compare(this.password,password)
}

export const User = mongoose.model("User",userschema)