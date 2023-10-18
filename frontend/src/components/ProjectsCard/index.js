import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({projectId, title, createdAt }) => {
  
const date = new Date(createdAt);
const year = date.getFullYear();
const month = date.getMonth() + 1; 
const day = date.getDate();
const fulldate = day + '-' + month + '-' + year;

  return (
    <Link to = {`/project_details/${projectId}`}>
    <div className="bg-gray-200 rounded-lg shadow-lg w-80 m-4 p-4">
      <div className="text-lg text-primary font-bold">{title}</div>
      <div className="text-gray-600">Created on: {fulldate}</div>
    </div>
    </Link>
  );
};

const UserProjects = ({ projects }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {projects.map((project, index) => (
        <ProjectCard key={index} projectId={project._id}  title={project.title} createdAt={project.createdAt} />
      ))}
    </div>
  );
};

export default UserProjects;
