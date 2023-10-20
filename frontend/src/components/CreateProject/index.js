import React, { useState } from 'react';
import axios from 'axios';
import {FaAngleRight} from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar';
import AddMember from '../AddMember';

const CreateProject = () => {
  const [title, setProjectTitle] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [team_members, setMembers] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [titleError, setTitleError] = useState('');
  const team_leader = localStorage.getItem('id');

  const token  = localStorage.getItem('token')
  if (!token){
    window.location.href = "/login"
  }
   // Assuming you have stored the user's ID in local storage
const userId = localStorage.getItem('id');



  const handleTitleChange = (e) => {
    setProjectTitle(e.target.value);
    
    setTitleError('')
  };

  const handleEmailChange = (e) => {
    setMemberEmail(e.target.value);
    
    setEmailError('');
  };

  const addMember = () => {
    if (!isValidEmail(memberEmail)) {
      setEmailError('Enter a valid email');
      console.log(memberEmail)
    } else if (memberEmail.trim() !== '') {
      setMembers([...team_members, memberEmail]);
      setMemberEmail('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   if(title.trim() === ''){
    setTitleError("Please enter project title")
    console.log(emailError)
    console.log(titleError)
   }else{
    try {
        const response = await axios.get(`http://localhost:3000/users/getUser/${userId}`);
        const userEmail = response.data.Email;
        // console.log('User Email:', userEmail);
    
      } catch (error) {
        console.error('Error fetching user email', error);
      }
    const userIds = [];
  
    if (title === '') {
      setTitleError('Please enter a title');
    } else {
      for (const email of team_members) {
        try {
          const response = await axios.get(`http://localhost:3000/users/getUserByEmail?email=${email}`);
          const user = response.data;
          console.log(user)
          userIds.push(user._id); 
        } catch (error) {
          console.error(`Error fetching user with email ${email}:`, error);
        }
      }
      console.log(userIds)


      for (const email of team_members) {
        try {
          const response = await axios.post("http://localhost:3000/addbyEmail", { email });
          console.log("Email sent successfully", response);
        } catch (error) {
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
          console.error("Project creation failed", error);
        });
    }}
  };
  
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    return emailPattern.test(email);
  };

  return (
    <>
    <Sidebar/>
    <div className="container mx-auto mt-10">
       <div className='text-primary text-2xl font-bold bg-white mx-auto w-1/2 p-4 md:p-6 rounded '>Create Project</div> 
      <form
        // onSubmit={handleSubmit}
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
          onClick={handleSubmit}
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
