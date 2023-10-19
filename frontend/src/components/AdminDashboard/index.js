import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function AdminDashboard() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [numUsers, setNumUsers] = useState(0);
  const [numProjects, setNumProjects] = useState(0);
  const [numTasks, setNumTasks] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/users/getUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNumUsers(data.length);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching number of users:', error);
      });
    fetch('http://localhost:3000/projects/getProjects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNumProjects(data.length);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching number of projects:', error);
      });
    fetch('http://localhost:3000/tasks/getTasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNumTasks(data.length);
        console.log(data);
        console.log(data.length);
      })
      .catch((error) => {
        console.error('Error fetching number of tasks:', error);
      });
      const populateProjectTasksChart = async () => {
        try {
          const response = await fetch('http://localhost:3000/projects/getProjects', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            const projectNames = data.map((entry) => entry.projectName);
            const taskCounts = data.map((entry) => entry.taskCount);
  
            const ctx = document.getElementById('projectTasksChart').getContext('2d');
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: projectNames,
                datasets: [
                  {
                    label: 'Number of Tasks',
                    data: taskCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          } else {
            console.error('Failed to fetch data for the chart.');
          }
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };
  
      populateProjectTasksChart();
  }, [token]);
  return (
  role === 'true' ? (
    <div className='p-4 bg-white rounded shadow-lg'>
      <div className='text-2xl font-bold mb-4'>Admin Dashboard</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='p-4 bg-blue-200 rounded shadow-md'>
          <div className='text-lg font-semibold'>Users</div>
          <div className='text-4xl font-bold'>{numUsers}</div>
        </div>
        <div className='p-4 bg-blue-200 rounded shadow-md'>
          <div className='text-lg font-semibold'>Projects</div>
          <div className='text-4xl font-bold'>{numProjects}</div>
        </div>
        <div className='p-4 bg-blue-200 rounded shadow-md'>
          <div className='text-lg font-semibold'>Tasks</div>
          <div className='text-4xl font-bold'>{numTasks}</div>
        </div>
      </div>
      <div className='mt-5'>
          <canvas id='projectTasksChart' width='400' height='200'></canvas>
        </div>
    </div>
  )  : (
      <h1 style={{ color: 'red' }}>You are not authorized to view this page.</h1>
    )
  );
}

export default AdminDashboard;
