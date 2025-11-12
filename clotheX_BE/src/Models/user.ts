import {model , Schema} from "mongoose";

const userSchema = new Schema({

    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : String,
    profilePic : String,
    role : {
        type : String,
        enum : ["buyer" , "seller"],
        default : "buyer",
    }
})

export const UserModel = model("User" , userSchema) ;