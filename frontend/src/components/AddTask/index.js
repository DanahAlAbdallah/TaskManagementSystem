import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMember from '../AddMember';
import AllTasks from '../AllTasks';
function AddTask() {
    
      const [task, setTask] = useState('');
      const [taskBody, setTaskBody] = useState('');
      const [dueDate, setDueDate] = useState('');
      const [priority, setPriority] = useState('');
      const [memberEmail, setMemberEmail] = useState('');

      const [taskError, setTaskError] = useState('');
      const [taskBodyError, setTaskBodyError] = useState('');
      const [dueDateError, setDueDateError] = useState('');
      const [priorityError, setPriorityError] = useState('')
      const [memberEmailError, setMemberEmailError] = useState('');
      const [teamMembersEmails, setTeamMembersEmails] = useState([]);
      const {projectId} = useParams();
      const userId = localStorage.getItem('id')
      const token  = localStorage.getItem('token')
      if (!token){
        window.location.href = "/login"
      }
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
      const handlePriorityChange = (e) => {
        setPriority(e.target.value);
      };
      
      const handleMemberEmailChange = (e) => {
        setMemberEmail(e.target.value);
      };
    
      const handleAssignTask = () => {
      //  console.log(task)
      //  console.log(taskBody)
      //  console.log(dueDate)
      //  console.log(memberEmail)
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
        }else if(priority === ''){
          setPriorityError("Select task priority")
          setDueDateError('')
        }
        else if(memberEmail === ''){
          setMemberEmailError("Select a member to assign the task")
          setPriorityError('')
        }
          else{
            axios.post('http://localhost:3000/tasks/addTask', {
              title: task,
              body: taskBody,
              projectId,
              author: userId,
              priority,
              isDone: false,
              assigned_userId: memberEmail,
              dueDate
                })
            .then((response) => {
              console.log("Task Added")
              toast.success('Task Assigned !', {
                position: 'top-right',
                autoClose: 3000,
              });
              setTask('')
              setTaskBody('')
              setDueDate('')
              setPriority('')
              setMemberEmail('')
              
            })
            .catch((error) => console.error('Error adding task', error));
          }
        
      }
    };
   
      return (
        <>
        <div className='mt-20 mb-20'>
          <div className="bg-gray-100 p-6 rounded-lg  shadow-lg flex space-x-6 w-1/2 ml-80 pr-32">
          <h3 className="text-xl text-primary font-bold mb-4">Assign Tasks:</h3>
            <div className="space-y-4 mt-10">
              <input
                type="text"
                className="w-full border rounded px-4 py-2 text-gray-500"
                placeholder="Task"
                value={task}
                onChange={handleTaskChange}
              />
              <div className="text-red-600 text-sm">{taskError}</div>
               <textarea
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
                value={priority}
                onChange={handlePriorityChange}
              >
                <option value="" disabled>Select Task Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="text-red-600 text-sm">{priorityError}</div>
              <select
                className="w-full border rounded px-4 py-2"
                value={memberEmail}
                onChange={handleMemberEmailChange}
              >
             
                <option value="" disabled>Select Team Member</option>
                {teamMembersEmails.map((teamMember, index) => (
                  <option key={index} value={teamMember._id}> 
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
        <AllTasks/>
        </>
      );
    
    
}

export default AddTask