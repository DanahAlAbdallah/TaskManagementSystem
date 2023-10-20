import React, { useState, useEffect } from 'react';
import UserProjectsCard from '../ProjectsCard';
import Sidebar from '../Sidebar';
import axios from 'axios';

const MyProjects = () => {
  // Sample project data (replace with your data)
  const [projects, setProjects] = useState([]);
  const userid = localStorage.getItem('id');
  const token  = localStorage.getItem('token')
  if (!token){
    window.location.href = "/login"
  }
  useEffect(() => {
    // Inside a function to use async/await
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/my_projects/${userid}`);
        setProjects(response.data);
        console.log(projects.createdAt)
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []); 
console.log(projects)
  return (
    <>
    <Sidebar/>
    <div className='text-primary mx-auto ml-40  mt-10 font-bold text-2xl md:ml-80 '>My Projects</div>
    <div className=" flex justify-center h-3/4 mt-10 md: ml-40">
      <UserProjectsCard projects={projects} />
    </div>
    </>
  );
};

export default MyProjects;
