import express from "express";
import connectDb from "./config/db";
import bcrypt from "bcrypt";
import { UserModel } from "./Models/user";
import jsonwebtoken from "jsonwebtoken";

const app = express();
const saltRound = 5;
const JWT_KEY ="12343243";
app.use(express.json());
connectDb();

app.get("/",(req,res)=>{
    res.json("hiii");
})
app.post("/api/v1/signup", async(req,res)=>{
    const {email,password} = req.body;
    const hashedPwd = await bcrypt.hash(password, saltRound);
    console.log(hashedPwd);
    try {
       await UserModel.create({
            email,
            password : hashedPwd,
        })
        console.log("Signed Successfully!")
    } catch (error) {
        console.log("something went wrong !", error);
    }
    
})

app.post("/api/v1/signin",async(req,res)=>{
    const {email,password} = req.body;

    const existingUser = await UserModel.findOne({email});
    if(!existingUser){
        res.json("User Not exist!")
    }
        const storedPwd = existingUser?.password;
        //@ts-ignore
        const validUser = bcrypt.compare(password, storedPwd);
    if(!validUser){
        res.json("Wrong Credentials !");
    }
    //@ts-ignore
    const token = jsonwebtoken.sign({ id: existingUser._id} , JWT_KEY);
    res.json({token : token});
    
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});
