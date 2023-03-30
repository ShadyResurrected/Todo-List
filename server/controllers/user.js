import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendCookie } from "../utils/feature.js"
import ErrorHandler from "../middlewares/error.js"
export const getAllUsers = async (req,res) => {
  try{
      const users = await User.find({})
  
  res.json({
    success : true,
    users
  })
  }catch(error){
    next(error)
  }
}

export const register = async(req,res) => {
try{
    const {name,email,password} = req.body

  let user = await User.findOne({email})

  if(user) return next(new ErrorHandler("User Already Exists", 400))

  const hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({name,email,password : hashedPassword})

  sendCookie(user,res,"Registered Successfully",201)
}catch(error){
  next(error)
}
}

export const login = async(req,res,next) => {
try{
    const {email,password} = req.body;

  const user = await User.findOne({email}).select("+password")
  // as we have declared select as false in the model we have to also include password field to recieve it other than email

  // if the email does not matches
  if(!user) return next(new ErrorHandler("Invalid Email or Password", 400))

  const isMatch = await bcrypt.compare(password,user.password)

    // is password does not matches
    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400))

  sendCookie(user,res,`Welcome Back, ${user.name}`, 200)
}catch(error){
  next(error)
}
}

export const getMyProfile = async (req,res) => {

  try{
    res.status(200).json({
    success : true,
    user : req.user
  })
  }catch(error){
    next(error)
  }
}

export const logout = (req,res) => {
try{
    res.status(200).cookie("token", "", {expires : new Date(Date.now())}).json({
    success : true,
    user : req.user
  })
}catch(error){
  next(error)
}
}