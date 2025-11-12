import mongoose from "mongoose";

export default function connectDb(){
    try {
        mongoose.connect("mongodb://localhost:27017/clotheX");
        console.log("Database Connected successfully !");
    } catch (error) {
        console.log("Connection failed!", error);
    }
}