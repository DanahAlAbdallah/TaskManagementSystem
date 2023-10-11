const validateProjectData = (req, res, next) => {
    const { title, team_members, team_leader, related_tasks, createdAt } = req.body;
  
    // Check if required fields are present
    if (!title || !team_members || !team_leader) {
      return res.status(400).json({ message: 'Title, team_members, and team_leader are required fields' });
    }
  
    // Validate that team_members and team_leader are valid ObjectId strings
    if (!mongoose.Types.ObjectId.isValid(team_members) || !mongoose.Types.ObjectId.isValid(team_leader)) {
      return res.status(400).json({ message: 'Invalid team_members or team_leader' });
    }
    next();
  };
  
  export { validateProjectData };