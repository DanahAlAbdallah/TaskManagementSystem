import React, { useState, useEffect,useRef } from 'react';
import Chart from 'chart.js/auto';


function AdminDashboard() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [numUsers, setNumUsers] = useState(0);
  const [numProjects, setNumProjects] = useState(0);
  const [numTasks, setNumTasks] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/users/getUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNumUsers(data.length);
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
      })
      .catch((error) => {
        console.error('Error fetching number of tasks:', error);
      });
  }, [token]);

  useEffect(() => {
    const populateProjectTasksChart = async () => {
      try {
        // Fetch project data
        const data = await fetch('http://localhost:3000/tasks/getTasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data.ok) {
          console.error('Failed to fetch project data for the chart.');
          return;
        }

        const tasksData = await data.json();
        const projectsMap = new Map();
        tasksData.map((tasks) => {
          if(!projectsMap.has(tasks.projectId.title)){
            projectsMap.set(tasks.projectId.title, 1)
          } else {
            projectsMap.set(tasks.projectId.title, projectsMap.get(tasks.projectId.title) + 1)
          }
        })
        
         const ctx = chartRef.current.getContext('2d');
        // Create a new Chart instance
        if (chartRef.current) {
         new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Array.from(projectsMap.keys()),
            datasets: [
              {
                label: 'Number of Tasks',
                data: Array.from(projectsMap.values()),
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
      } }catch (error) {
        console.error('Error fetching or rendering the chart:', error);
      }
    };
        populateProjectTasksChart();
      
  }, [token,chartRef]);
//modal
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
          <canvas ref={chartRef} width='400' height='200'></canvas>
        </div>
      </div>
    ) : (
      <h1 style={{ color: 'red' }}>You are not authorized to view this page.</h1>
    )
  );
}

export default AdminDashboard;