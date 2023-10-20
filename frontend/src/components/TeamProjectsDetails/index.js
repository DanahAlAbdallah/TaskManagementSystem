import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import ColoredSquares from '../ColoredSquares';

function TeamProjectsDetails() {
  const assignedUserId = localStorage.getItem('id');
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/userTask/${assignedUserId}/${projectId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, [assignedUserId, projectId]);

  const toggleTaskDone = (taskId) => {
    // Create a copy of tasks and update the "done" property for the specific task
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const priorityColors = {
    low: 'bg-green-200',
    medium: 'bg-blue-200',
    high: 'bg-red-300',
  };
  function formatDueDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  

  return (
    <>
      <Sidebar />
      <div className="flex">
      <div className="w-1/2 ml-80 relative">
        <h1 className="text-2xl font-bold mb-4 text-primary mt-10">Team Projects Details</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className={`mb-4 p-4 rounded-lg shadow-md ${task.priority === 'low' ? 'bg-green-300' : task.priority === 'medium' ? 'bg-blue-300' : 'bg-red-300'}`}>
              <div className="font-semibold text-lg text-gray-700">{task.title}</div>
              <hr className="w-30 h-1 bg-gray-700 mb-4" />
              <div className="text-gray-700 mb-5">{task.body}</div>
              <div className="text-gray-700">Due Date: {formatDueDate(task.dueDate)}</div>
              {/* <div className="mt-2 p-2 rounded">Priority: {task.priority}</div> */}
              
              <label className="relative inline-flex items-center cursor-pointer ml-96">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Done!</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ColoredSquares /> {/* Include the ColoredSquares component here */}
    </div>
    </>
  );
}

export default TeamProjectsDetails;
