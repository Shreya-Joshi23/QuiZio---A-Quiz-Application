import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"]
    },
    profilePic:{
        type:String,
        default:null
    }
})

const User=mongoose.model("User",UserSchema)

export default User