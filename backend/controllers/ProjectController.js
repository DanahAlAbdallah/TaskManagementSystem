import Project from '../models/Project.js';
// import task from '../models/Task.js';
import user from '../models/User.js';

export const getProjects= async(req, res) => {
  try {
    const projects = await Project.find().populate({path:"team_members", select:['first_name','last_name']}).populate({path:"team_leader", select:['first_name','last_name']}).populate({path:"related_tasks", select:['title']});
    res.json(projects);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
};

export const getProjectById = async(req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id).populate({path:"team_members", select:['first_name','last_name']}).populate({path:"team_leader", select:['first_name','last_name']}).populate({path:"related_tasks", select:['title']});
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
};

export const addProject = async(req, res) => {
  try {
    const newProject= new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
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

export const updateProject = async(req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

export const deleteProject = async(req, res) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

