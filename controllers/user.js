import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendCookie } from "../utils/feature.js"
export const getAllUsers = async (req,res) => {

  const users = await User.find({})
  
  res.json({
    success : true,
    users
  })
}

export const register = async(req,res) => {
  const {name,email,password} = req.body

  let user = await User.findOne({email})

  if(user) return res.status(404).json({
    success : false, message : "User already exists"
  })

  const hashedPassword = await bcrypt.hash(password,10)
  user = await User.create({name,email,password : hashedPassword})

  sendCookie(user,res,"Registered Successfully",201)
}

export const login = async(req,res,next) => {
  const {email,password} = req.body;

  const user = await User.findOne({email}).select("+password")
  // as we have declared select as false in the model we have to also include password field to recieve it other than email

  // if the email does not matches
  if(!user){
    return res.status(404).json({
      success : false,
      message : "Invalid Email or Passowrd"
    })
  }

  const isMatch = await bcrypt.compare(password,user.password)

    // is password does not matches
    if(!isMatch){
    return res.status(404).json({
      success : false,
      message : "Invalid Email or Passowrd"
    })
  }

  sendCookie(user,res,`Welcome Back, ${user.name}`, 200)
}

export const getMyProfile = async (req,res) => {

  res.status(200).json({
    success : true,
    user : req.user
  })
}

export const logout = (req,res) => {
  res.status(200).cookie("token", "", {expires : new Date(Date.now())}).json({
    success : true,
    user : req.user
  })
}