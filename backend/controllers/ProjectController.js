import Project from '../models/Project.js';
import User from '../models/User.js';
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


export const getProjectsByTeamLeader = async (req, res) => {
  try {
    const teamLeaderId = req.params.teamleader;

    // Use Mongoose to find all projects with the specified team_leader
    const projects = await Project.find({ team_leader: teamLeaderId });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for the given team leader' });
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getTeamMembersByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Use Mongoose to find the project by its ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Assuming that your project schema has an array of team_members, you can access it like this:
    const teamMemberIds = project.team_members;

    // Use Mongoose to find the team members by their IDs using `find` and `$in`
    const teamMembers = await User.find({ _id: { $in: teamMemberIds } });

    if (teamMembers.length === 0) {
      return res.status(404).json({ message: 'No team members found for the given project' });
    }

    // Create an array of objects with _id and email properties
    const teamMemberEmails = teamMembers.map((member) => ({ _id: member._id, Email: member.Email }));
    console.log(teamMemberEmails);

    res.json(teamMemberEmails);
    console.log(teamMemberEmails)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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


export const removeTeamMember = async (req, res) => {
  const projectId = req.params.projectId; 
  const memberId = req.body.memberId; 

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the member ID exists in the team_members array
    const memberIndex = project.team_members.indexOf(memberId);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in the project' });
    }

    // Remove the member ID from the team_members array
    project.team_members.splice(memberIndex, 1);

    // Save the updated project with the member removed
    const updatedProject = await project.save();

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

