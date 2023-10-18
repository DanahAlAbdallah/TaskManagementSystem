import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function AddTask() {
    
      const [task, setTask] = useState('');
      const [taskBody, setTaskBody] = useState('');
      const [dueDate, setDueDate] = useState('');
      const [memberEmail, setMemberEmail] = useState('');

      const [taskError, setTaskError] = useState('');
      const [taskBodyError, setTaskBodyError] = useState('');
      const [dueDateError, setDueDateError] = useState('');
      const [memberEmailError, setMemberEmailError] = useState('');
      const [teamMembersEmails, setTeamMembersEmails] = useState([]);
      const {projectId} = useParams();
      const userId = localStorage.getItem('id')
   useEffect(() => {
 
  axios
    .get(`http://localhost:3000/projects/getEmails/${projectId}`)
    .then((response) => {
      setTeamMembersEmails(response.data);
      console.log(response.data)
    })
    .catch((error) => console.error('Error fetching team members:', error));
}, [projectId]); 


      const handleTaskChange = (e) => {
        setTask(e.target.value);
      };
      const handleTaskBodyChange = (e) => {
        setTaskBody(e.target.value);
      };
    
      const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
      };
      
      const handleMemberEmailChange = (e) => {
        setMemberEmail(e.target.value);
      };
    
      const handleAssignTask = () => {
       console.log(task)
       console.log(taskBody)
       console.log(dueDate)
       console.log(memberEmail)
       if(task === ''){
        setTaskError("Please enter a task name");
       }else if(taskBody === ''){
        setTaskBodyError("Enter task details")
        setTaskError('')
       }else {
        // Check if the due date is in the past
        const dueDateObj = new Date(dueDate);
        const currentDate = new Date();
    
        if (dueDateObj < currentDate) {
          setDueDateError("Due date is in the past");
          setTaskBodyError('')
        }

        else if( dueDate === ''){
          setDueDateError('')
          setDueDateError('Select a due date')
          setTaskBodyError('')
        }
        else if(memberEmail === ''){
          setMemberEmailError("Select a member to assign the task")
          setDueDateError('')
        }
          else{
            axios.post('http://localhost:3000/tasks/addTask', {
              title: task,
              body: taskBody,
              author: userId,
              priority: "low",
              assigned_userId: memberEmail,
              dueDate
                })
            .then((response) => {
              console.log("Task Added")
              setTask('')
              setTaskBody('')
              setDueDate('')
              setMemberEmail('')
              
            })
            .catch((error) => console.error('Error adding task', error));
          }
        
      }
    };
   
      return (
        <div className='mt-20 mb-20'>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex space-x-6 w-1/2 ml-80 pr-32">
          <h3 className="text-xl text-primary font-bold mb-4">Assign Tasks:</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                placeholder="Task"
                value={task}
                onChange={handleTaskChange}
              />
              <div className="text-red-600 text-sm">{taskError}</div>
               <input
                type="text"
                className="w-full border rounded px-4 py-2"
                placeholder="Task body"
                value={taskBody}
                onChange={handleTaskBodyChange}
              />
              <div className="text-red-600 text-sm">{taskBodyError}</div>
              <input
                type="date"
                className="w-full border rounded px-4 py-2"
                placeholder="Due Date"
                value={dueDate}
                onChange={handleDueDateChange}
              />
              <div className="text-red-600 text-sm">{dueDateError}</div>
              <select
                className="w-full border rounded px-4 py-2"
                value={memberEmail}
                onChange={handleMemberEmailChange}
              >
                <option value="" disabled>Select Team Member</option>
                {teamMembersEmails.map((teamMember, index) => (
                  <option key={index} value={teamMember._id}> {/* Access the 'email' property */}
                    {teamMember.Email}
                  </option>
                ))}
              </select>

                <div className="text-red-600 text-sm">{memberEmailError}</div>

              <button
                className='btn btn-primary bg-primary px-4 py-2 rounded text-white'
                onClick={handleAssignTask}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      );
    
    
}

export default AddTask