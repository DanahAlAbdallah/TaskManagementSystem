import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks/getTasks')
      .then(response => {
        setTasks(response.data);
        const assignedUserIds = response.data.map(task => task. assigned_userId);
        setUsers(assignedUserIds);
        console.log(users)
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []); 

  useEffect(() => {
    // Loop through user IDs and fetch emails for each user
    users.forEach(user=> {
        const id= user._id;
        console.log(id)
      axios.get(`http://localhost:3000/users/getUser/${id}`)
        .then(response => {
          const userEmail = response.data.Email;
          setEmails(prevEmails => [...prevEmails, userEmail]);
        })
        .catch(error => {
          console.error(`Error fetching user email for user ID ${id}:`, error);
        });
    });
  }, [users]); 


  return (
    <div className="bg-gray-100 p-6 rounded-lg  shadow-lg flex space-x-6 w-1/2 ml-80 pr-32 mb-10">
      <h1 className="text-2xl text-primary mb-4 font-bold">All Tasks</h1>
      <table className="table-auto">
        <thead className='bg-gray-50 '>
          <tr>
            <th className="px-4 py-2 text-sm text-primary">Task Name</th>
            <th className="px-4 py-2 text-sm text-primary">Task Body</th>
            <th className="px-4 py-2 text-sm text-primary">Assigned User</th>
            <th className="px-4 py-2 text-sm text-primary">Due Date</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
  {tasks.map((task, index) => {
    const date = new Date(task.dueDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fulldate = day + '-' + month + '-' + year;

    // Define a variable for the background color based on task.isDone
    const bgColorClass = task.isDone ? 'bg-blue-200' : 'bg-red-200';

    return (
      <tr key={task.id}>
        <td className={`border px-4 py-2 ${bgColorClass}`}>{task.title}</td>
        <td className={`border px-4 py-2 ${bgColorClass}`}>{task.body}</td>
        <td className={`border px-4 py-2 ${bgColorClass}`}>{emails[index]}</td>
        <td className={`border px-4 py-2 ${bgColorClass}`}>{fulldate}</td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
}

export default AllTasks;
