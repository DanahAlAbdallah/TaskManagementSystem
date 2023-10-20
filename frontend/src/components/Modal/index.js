import React, { useState } from "react";
import axios from "axios"; // Import axios here
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState(''); // Moved the state initialization here
  const [emailError, setEmailError] = useState('');
  const [memberId , setMemberId] = useState('')
const {projectId} = useParams()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear the email error when the user makes changes
    setEmailError('');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if(email === ''){
        setEmailError("Enter Member Email")
    }else if(!isValidEmail(email)){
        setEmailError('Invalid Email')
    }else{
  
    try {
      const response = await axios.get(`http://localhost:3000/users/getUserByEmail?email=${email}`);
      const user = response.data;
  
      // Check if a user with the given email was found
      if (user) {
        const userId = user._id; // Get the user ID
        setMemberId(userId); // Set the user ID in the state
        console.log(userId);
        console.log(user);
  
        try {
          const updateResponse = await axios.put(`http://localhost:3000/projects/update_members/${projectId}`, { memberId: userId });
          console.log("Team members updated successfully", updateResponse);
          setEmail('')
          toast.success('Team Member Added successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
          
  
          // Email sending logic
          const emailResponse = await axios.post("http://localhost:3000/addbyEmail", { email });
  
          // Handle the email sending response here, if needed
          console.log("Email sent successfully", emailResponse);
  
        } catch (updateError) {
          // Handle errors related to updating project members here
          console.error("Team members update failed", updateError);
        }
      } else {
        // Handle the case where a user with a specific email is not found
        console.error("User not found for the given email");
      }
    } catch (error) {
      // Handle errors related to fetching the user by email here
      console.error(`Error fetching user with email ${email}:`, error);
    }}
  };
  

  const isValidEmail = (email) => {
    // Use a regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    return emailPattern.test(email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="modal-box w-3/5 h-1/2 ">
        <div className=" p-4 rounded-lg h-full bg-white">
          <h2 className="text-lg font-semibold text-primary">Add Member</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter Member Email"
            />
             <div className="text-red-600 text-sm">{emailError}</div>
          </div>
          <button
            className="bg-primary text-white py-2 px-4 mt-4 rounded-md"
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md ml-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
