import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel";

const register = async(req,res)=>{
  const {name, email, password} = req.body;
  if(!name || !email || !password){
    return res.json({success: false, message: 'missing details'})
  }
  try {
    const existingUser = await UserModel.findOne({email});
    if(existingUser){
      return res.json({success: false, message: 'user already exist'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({name, email, password: hashedPassword});
    await user.save();
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "7d"});
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production"?"none":"strict",
      maxTime: 7 * 24 * 60 * 60 * 1000
    })
    return res.json({success: true, message: "User registered successfully"});
  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}
const login = async(req, res)=>{
  const {email, password} = req.body;
  if(!email || !password){
    return res.json({success: false, message: "missing details"});
  }
  try {
    const user = await UserModel.findOne({email});
    if(!user){
      return res.json({success: false, message: "Invalid email"});
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.json({success: false, message:"Invalid password"}); 
    }
    const token = jwt.sign({id: user._id}, process.env.NODE_ENV,{expiresIn: "7d"});
    rec.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env>NODE_ENV === "production"?"none":"strict",
      maxTime: 7 * 24 * 60 * 60 * 1000
    })
    return res.json({success:true, message: "user logged in"})
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}

const logout = async(req,res)=>{
  try {
    res.clearCookie(token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production"?"none":"strict"
    })
    return res.json({success:true, message: "user logged out"})
  } catch (error) {
    return({success: false, message: error.message})
  }
}