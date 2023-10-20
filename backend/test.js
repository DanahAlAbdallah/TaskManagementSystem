import express, { text } from 'express';
import connect from './config/connectDB.js';
import cors from 'cors';
import { config } from 'dotenv';
import  usersRoute  from './routes/userRoute.js';
import  tasksRoute  from './routes/taskRoute.js';
import  projectRoute  from './routes/projectRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import contactRoute from './routes/contactRoute.js';
import nodemailer from 'nodemailer';
import UserModel from './models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Initialize dotenv
config();

// Create an Express app
const app = express();

// Apply middleware before defining routes
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Define your routes
app.get("/", function(req, res) {
  res.send("hello");
});

app.get("/contact", function(req, res) {
  res.send("Contact US");
});

app.get("/about", function(req, res) {
  res.send("Hello World");
});

app.use('/users', usersRoute);
app.use('/tasks', tasksRoute);
app.use('/projects', projectRoute);
app.use('/message', contactRoute);
app.use('/', AuthRoute);


app.use(cors({ origin: 'http://localhost:3001' }));

//for forget password
app.post('/forgot-password', (req, res) => {
  const {email} = req.body;
  UserModel.findOne({Email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, process.env.ACCESS, {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'danaalabdallah02@gmail.com',
            pass: 'agbh vmbr imlz qvvr'
          }
        });

        const emailContent = `
        <html>
          <body>
            <p>Hello ${user.first_name},</p>
            <p>We received a request to reset your password.</p>
            <p>To reset your password, click on the following link:</p>
            <a href="http://localhost:3001/reset_password/${user._id}/${token}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
          </body>
        </html>
      `;
        var mailOptions = {
          from: 'danaalabdallah02@gmail.com',
          to: email,
         
          subject: 'Reset Password Link',
          text: `http://localhost:3001/reset_password/${user._id}/${token}`,
          html: emailContent,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})

//for reset

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log("in reset");
  console.log("Received Password:", password);

  try {
    // Verify the JWT token
    jwt.verify(token, process.env.ACCESS, async (err, decoded) => {
      if (err) {
        console.error("Token Verification Error:", err);
        return res.json({ Status: "Error with token" });
      }

      // Hash the new password
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Update the user's password in the database
        try {
          await UserModel.findByIdAndUpdate(id, { password: hashedPassword });
          console.log("reset done");
          res.json({ Status: "Success" });
        } catch (updateError) {
          console.error("Update Error:", updateError);
          res.status(500).json({ Status: "Error updating password" });
        }
      } catch (hashError) {
        console.error("Hashing Error:", hashError);
        res.status(500).json({ Status: "Error hashing the password" });
      }
    });
  } catch (verificationError) {
    console.error("Verification Error:", verificationError);
    res.status(500).json({ Status: "Error during password reset" });
  }
});

//for add by email 
app.post('/addbyEmail', (req, res) => {
  const {email} = req.body;
  UserModel.findOne({Email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, process.env.ACCESS, {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'danaalabdallah02@gmail.com',
            pass: 'agbh vmbr imlz qvvr'
          }
        });
        const emailContent = `
        <html>
          <body>
            <p>Hello ${user.first_name},</p>
            <p>You've been invited to join a project!</p>
            <p>Click on the following link to Login:</p>
            <a href="http://localhost:3001/login">Login to Project</a>
          </body>
        </html>
      `;

        var mailOptions = {
          from: 'AchieveTeam@outlook.com',
          to: email,
         
          subject: 'Invite To Project Link',
          text: `http://localhost:3001/login`,
          html: emailContent,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})




app.listen(process.env.PORT, function() {
  connect();
  console.log(`Server started on port ${process.env.PORT}`);
});
