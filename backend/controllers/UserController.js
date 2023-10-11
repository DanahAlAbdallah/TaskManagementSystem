import User from '../models/User.js'; 
import Project from '../models/Project.js';

// GET all users
export const getUsers = async(req, res) => {
  try {
    const users = await User.find().populate({path:"projects_assigned", select:['title']});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET a specific user by ID
export const getUserById = async(req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate({path:"projects_assigned", select:['title']});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST a new user
export const addUser = async(req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

// PUT (update) a user by ID
export const updateUser = async(req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

// DELETE a user by ID
export const deleteUser = async(req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

