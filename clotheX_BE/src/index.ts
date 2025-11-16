import express from "express";
import connectDb from "./config/db";
import bcrypt from "bcrypt";
import { UserModel } from "./Models/user";
import jsonwebtoken from "jsonwebtoken";
import { productModel } from "./Models/product";

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

app.post("/api/v1/products", async(req ,res)=>{
    const product = req.body;
    try {
        await productModel.create({
            ...req.body,

        })
        res.json("product added !");
    } catch (error) {
        console.log("something went wrong ", error);
    }
})

app.get("/api/v1/products", async(req,res)=>{
    const allProducts = await productModel.find();
    res.json(allProducts);
})

app.get("/api/v1/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await productModel.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    //@ts-ignore
    res.status(500).json({ message: error.message });
  }
});


app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});
