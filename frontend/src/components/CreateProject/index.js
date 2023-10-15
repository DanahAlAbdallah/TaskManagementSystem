import React, { useState } from 'react';
import axios from 'axios';
import {FaAngleRight} from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar';

const CreateProject = () => {
  const [title, setProjectTitle] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [team_members, setMembers] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [titleError, setTitleError] = useState('');
  const team_leader = localStorage.getItem('id');

   // Assuming you have stored the user's ID in local storage
const userId = localStorage.getItem('id');

// Function to fetch the user's email by ID
// const fetchUserEmail = async (userId) => {
//   try {
//     const response = await axios.get(`http://localhost:3000/getUser/${userId}`);
//     const userEmail = response.data.Email;

//     // Display the email on the page
//     console.log('User Email:', userEmail);

//     // You can set the email in state or display it in your component as needed
//   } catch (error) {
//     // Handle errors here
//     console.error('Error fetching user email', error);
//   }
// };

// Call the function to fetch and display the email







  const handleTitleChange = (e) => {
    setProjectTitle(e.target.value);
    // Clear the title error when the user makes changes
    setTitleError('');
  };

  const handleEmailChange = (e) => {
    setMemberEmail(e.target.value);
    // Clear the email error when the user makes changes
    setEmailError('');
  };

  const addMember = () => {
    if (!isValidEmail(memberEmail)) {
      setEmailError('Enter a valid email');
    } else if (memberEmail.trim() !== '') {
      setMembers([...team_members, memberEmail]);
      setMemberEmail('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const teamleader = fetchUserEmail(userId);
    try {
        const response = await axios.get(`http://localhost:3000/users/getUser/${userId}`);
        const userEmail = response.data.Email;
    
        // Display the email on the page
        console.log('User Email:', userEmail);
    
        // You can set the email in state or display it in your component as needed
      } catch (error) {
        // Handle errors here
        console.error('Error fetching user email', error);
      }
    // console.log(teamleader)
    // Create an array to store the user IDs
    const userIds = [];
  
    if (title === '') {
      setTitleError('Please enter a title');
    } else {
      // Fetch user IDs for each email in team_members
      for (const email of team_members) {
        try {
          const response = await axios.get(`http://localhost:3000/users/getUser`,{email});
          const user = response.data;
          console.log(user)
          userIds.push(user._id); // Assuming '_id' is the field that stores user IDs
        } catch (error) {
          console.error(`Error fetching user with email ${email}:`, error);
          // Handle the case where a user with a specific email is not found
        }
      }
      console.log(userIds)


      for (const email of team_members) {
        try {
          const response = await axios.post("http://localhost:3000/addbyEmail", { email, team_leader });
          // Handle the response here, if needed
          console.log("Email sent successfully", response);
        } catch (error) {
          // Handle errors here
          console.error("Email sending failed", error);
        }
      }
      
  
      axios
        .post("http://localhost:3000/projects/addProject", { title, team_members: userIds, team_leader })
        .then((response) => {
            toast.success('Project created successfully!', {
                position: 'top-right',
                autoClose: 3000,
              });
              setProjectTitle('');
              setEmailError('')
        
          console.log('Project created successfully');
        })
        .catch((error) => {
          // Handle errors here
          console.error("Project creation failed", error);
        });
    }
  };
  
  const isValidEmail = (email) => {
    // Use a regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    return emailPattern.test(email);
  };

  return (
    <>
    <Sidebar/>
    <div className="container mx-auto mt-10">
       <div className='text-primary text-2xl font-bold bg-white mx-auto w-1/2 p-4 md:p-6 rounded '>Create Project</div> 
      <form
        onSubmit={handleSubmit}
        className="bg-white mx-auto w-1/2 p-4 md:p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter Project Title"
            required
          />
          <div className="text-red-600 text-sm">{titleError}</div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="memberEmail"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Members
          </label>
          <div className="flex items-center">
            <input
              type="email"
              id="memberEmail"
              name="memberEmail"
              value={memberEmail}
              onChange={handleEmailChange}
              className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Member Email"
            />

            <button
              type="button"
              onClick={addMember}
              className="ml-2 bg-primary text-white font-semibold py-2 px-3 md:px-4 rounded hover:bg-primary"
            >
              Add
            </button>
          </div>
          <div className="text-red-600 text-sm">{emailError}</div>
        </div>

        <div className="mb-4">
          <ul className=" pl-4 md:pl-5" >
          
            {team_members.map((member, index) => (
               <><span className='bg-primary text-primary'> <FaAngleRight/></span>
              <li className='ml-5 text-gray-600' key={index}>{member}</li></>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-primary text-white font-semibold py-2 px-3 md:px-4 rounded hover:bg-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateProject;
