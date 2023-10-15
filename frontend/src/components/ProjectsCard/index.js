import React from 'react';

const ProjectCard = ({ title, creationDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-80 m-4 p-4">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-gray-600">Created on: {creationDate}</div>
    </div>
  );
};

const UserProjects = ({ projects }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {projects.map((project, index) => (
        <ProjectCard key={index} title={project.title} creationDate={project.creationDate} />
      ))}
    </div>
  );
};

export default UserProjects;
