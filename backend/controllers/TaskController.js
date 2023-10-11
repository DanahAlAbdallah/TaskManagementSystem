import Task from '../models/Task.js';


export const getTasks = async(req, res) => {
  try {
    const tasks = await Task.find().populate({path:"author", select:['first_name','last_name']}).populate({path:"assigned_userId", select:['first_name','last_name']});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskById = async(req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).populate({path:"author", select:['first_name','last_name']}).populate({path:"assigned_userId", select:['first_name','last_name']});;
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addTask = async(req, res) => {
  try {
    const newTask= new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
  
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }
      return res.status(400).json({ errors: validationErrors });
    }
    res.status(400).json({ message: 'Bad request' });
  
  
  }
};

export const updateTask = async(req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

export const deleteTask = async(req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

