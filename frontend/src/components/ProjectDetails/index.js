import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import AddTask from '../AddTask';

function ProjectDetails() {
  const [project, setProject] = useState({});
  const [membersId, setMembersId] = useState([]);
  const [members, setMembers] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/getProject/${projectId}`);
        setProject(response.data);
        setMembersId(response.data.team_members);
        console.log(membersId)
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchData();
  }, [projectId]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await Promise.all(
            membersId.map(async (memberId) => {
              const memberIdString = memberId._id.toString(); // Convert the object to a string
              const response = await axios.get(`http://localhost:3000/users/getUser/${memberIdString}`);
              return response.data;
            })
          );
          
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    if (membersId.length > 0) {
      fetchMembers();
    }
  }, [membersId]);
  
  
  const handleRemoveMember = (memberId) => {
    console.log(memberId)
    console.log(projectId)
    try {
      // Send a POST request to remove the member with the specified memberId
      axios.post(`http://localhost:3000/projects/remove_member/${projectId}`, { memberId })
        .then((response) => {
          if (response.status === 200) {
            // Member successfully removed from the server
            const updatedMembers = members.filter((member) => member._id !== memberId);
            setMembers(updatedMembers);
            console.log("removed");
          } else {
            // Handle other status codes if needed
            console.error('Error: Member removal failed. Status code:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error removing member:', error);
        });
    } catch (error) {
      console.error('Error in handleRemoveMember:', error);
    }
  };
  
  return (
    <>
    <Sidebar/>
    <div className='ml-80 text-2xl font-bold text-primary mb-10 mt-10'>{project.title}</div>
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex space-x-6 w-1/2 ml-80 pr-32">
    <div className="flex-1">
      {project.gg && (
        <>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Title:</h3>
          <p className="text-lg">{project.title}</p>
        </div>
        {/* <div className="mb-4">
          <h3 className="text-xl font-bold">Created Date:</h3>
          <p className="text-lg">{new Date(project.createdAt).toLocaleString()}</p>
        </div> */}
        </>
      )}
    </div>
    <div className="flex-1">
      <h3 className="text-xl text-primary font-bold mb-4">Team Members:</h3>
      <table className="table-auto ">
      
        <thead className=' bg-gray-50'>
          <tr>
            <th className=" text-primary text-sm py-4">First Name</th>
            <th className="px-4 text-primary text-sm py-2">Last Name</th>
            <th className="px-4 text-primary text-sm py-2">Email</th>
          </tr>
        </thead>
        <tbody className='border-solid text-gray-600'>
          {members.map((member) => (
            <tr key={member._id}>
              <td className="border px-4 py-2">{member.first_name}</td>
              <td className="border px-4 py-2">{member.last_name}</td>
              <td className="border px-4 py-2">{member.Email}</td>
              <td className="border px-4 py-2"><button className='btn btn-primary bg-primary p-2 rounded text-white'   onClick={() => handleRemoveMember(member._id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  <AddTask/>
  </>
  );
}

export default ProjectDetails;
