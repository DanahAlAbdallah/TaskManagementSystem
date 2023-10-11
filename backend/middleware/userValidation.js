// import User from '../models/User.js'; 
// import Project from '../models/Project.js';
const validateUserData = (req, res, next) => {
    const { first_name, last_name, Email, age, password, gender } = req.body;
  
    // Define validation rules here
    if (!first_name || !last_name || !Email || !age || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Add more specific validation rules as needed (e.g., email format, age range, etc.)
    if (first_name.length < 3 || last_name.length < 3) {
      return res.status(400).json({ message: 'First and last names must be at least 3 characters long' });
    }
    next();
  };
  export { validateUserData };