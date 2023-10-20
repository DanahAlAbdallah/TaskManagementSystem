import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

function TeamProjects() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  }

  const memberId = localStorage.getItem('id');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
   
    async function fetchProjects() {
      try {
        const response = await axios.get(`http://localhost:3000/projects/getMyProjects/${memberId}`);
        setProjects(response.data); 
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    
    fetchProjects();
  }, [memberId]); 
   
  
  useEffect(() => {
    
    async function fetchProjects() {
      try {
        const response = await axios.get(`http://localhost:3000/users/getUser/:id/${memberId}`);
        setProjects(response.data); 
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

   
    fetchProjects();
  }, [memberId]); 
  
  

  return (
    <>
    <Sidebar/>
    <div className='ml-80'>
      <h1 className='font-bold text-primary text-2xl mt-10'>Team Projects</h1>
      <ul>
        {projects.map((project) => {
          const date = new Date(project.createdAt);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const fulldate = day + '-' + month + '-' + year;
          return (
            <Link to={`/TeamProjects/${project._id}`}>
            <li key={project._id}>
              <div className="bg-gray-200 rounded-lg shadow-lg w-80 m-4 p-4 mt-10">
                <div className="text-lg text-primary font-bold">{project.title}</div>
                <div className="text-gray-600">Created on: {fulldate}</div>
              </div>
            </li>
            </Link>
          );
        })}
      </ul>
    </div>
    </>
  );
}

export default TeamProjects;
