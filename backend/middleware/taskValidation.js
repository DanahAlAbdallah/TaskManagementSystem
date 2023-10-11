const validateTaskData = (req, res, next) => {
    const { title, body, priority, author, assigned_userId, tags, createdAt, updatedAt } = req.body;
  
    // Check if required fields are present
    if (!title || !body || !priority || !author || !assigned_userId) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
  
    // Validate priority against the enum values
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: 'Priority must be one of "low," "medium," or "high"' });
    }
  
    // Validate that author and assigned_userId are valid ObjectId strings
    if (!mongoose.Types.ObjectId.isValid(author) || !mongoose.Types.ObjectId.isValid(assigned_userId)) {
      return res.status(400).json({ message: 'Invalid author or assigned_userId' });
    }
    next();
  };
  
  export { validateTaskData };