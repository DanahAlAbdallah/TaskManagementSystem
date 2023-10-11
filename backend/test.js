import express from 'express';
import connect from './config/connectDB.js';
import cors from 'cors';
import { config } from 'dotenv';
import  usersRoute  from './routes/userRoute.js';
import  tasksRoute  from './routes/taskRoute.js';
import  projectRoute  from './routes/projectRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import contactRoute from './routes/contactRoute.js';

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

app.listen(process.env.PORT, function() {
  connect();
  console.log(`Server started on port ${process.env.PORT}`);
});
