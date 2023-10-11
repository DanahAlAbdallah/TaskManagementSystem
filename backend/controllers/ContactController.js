import Contact from '../models/Contact.js';

// POST a new contact form submission
export const addContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Couldent send message' });
  }
};
