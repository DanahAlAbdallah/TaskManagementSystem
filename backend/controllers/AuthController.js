import User from '../models/User.js'; 
import { config } from 'dotenv';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Login = asyncHandler(async (req, res) => {
  const { Email, password } = req.body;
  if (!Email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ Email });
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          eEmailmail: user.Email,
          id: user._id,
          role: user.isAdmin,
         
        },
      },
      process.env.ACCESS,
      { expiresIn: "1d" }
    );
    
    
    res.status(200).json({ accessToken: token, role: user.isAdmin, id: user._id });
  } else {
    res.status(401).json({ error: "Email or Password is not valid" });
  }
});


  export const Register = asyncHandler(async (req, res) => {
    try {
      const { first_name, last_name, Email, password, age, gender } = req.body;
  
      // Check if all required fields are provided
      if (!first_name || !last_name || !Email || !password || !age || !gender) {
        res.status(400).json({ error: "All fields are mandatory!" });
        return;
      }
  
      // Check if the email format is valid
      if (!isValidEmail(Email)) {
        res.status(400).json({ error: "Invalid email format" });
        return;
      }
  
      // Check if the email is already registered
      const emailUser = await User.findOne({ Email });
      if (emailUser) {
        res.status(400).json({ error: "Email already registered" });
        return;
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = await User.create({
        first_name,
        last_name,
        Email,
        password: hashedPassword,
        age,
        isAdmin: false,
        gender,
      });
  
      console.log(`User created ${user}`);
  
      if (user) {
        res.status(201).json({ _id: user.id, Email: user.Email });
      } else {
        res.status(400).json({ error: "User data is not valid" });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
  
  // Function to check if the email format is valid
  const isValidEmail = (email) => {
    // Use a regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  



export const logout = asyncHandler(async (req, res) => {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  }
)