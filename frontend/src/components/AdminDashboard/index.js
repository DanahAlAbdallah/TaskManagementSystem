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
  }, [token]);

  useEffect(() => {
    const populateProjectTasksChart = async () => {
      try {
        // Fetch project data
        const projectsResponse = await fetch('http://localhost:3000/projects/getProjects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!projectsResponse.ok) {
          console.error('Failed to fetch project data for the chart.');
          return;
        }

        const projectsData = await projectsResponse.json();
        const projectNames = projectsData.map((project) => project.title);

        // Fetch task data
        const tasksResponse = await fetch('http://localhost:3000/tasks/getTasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!tasksResponse.ok) {
          console.error('Failed to fetch task data for the chart.');
          return;
        }

        const tasksData = await tasksResponse.json();
        console.log(tasksData);
        // // Process your data to calculate the number of tasks in each project
        // const taskCounts = projectNames.map((title) => {
        //   // Find the project in projectsData with a matching title
        //   const project = projectsData.find((project) => project.title === title);
        // console.log(project);
        //   // If the project was found, find and count the tasks with matching related_tasks
        //   if (project) {
        //     return tasksData.filter((task) => task._id === project.related_tasks._id).length;
        //   } else {
        //     // If the project was not found, return 0 tasks
        //     return 0;
        //   }
        // });
        const taskCounts = projectNames.map((title) => {
          const project = projectsData.find((project) => project.title === title);
        
          if (project) {
            // Check if related_tasks is an array
            if (Array.isArray(project.related_tasks)) {
              // Count tasks with matching _id in related_tasks
              return project.related_tasks.filter((relatedTask) => {
                return tasksData.some((task) => task._id === relatedTask._id);
              }).length;
            }
          }
        
          return 0;
        });
        console.log(taskCounts);

        
         const ctx = chartRef.current.getContext('2d');
        // Create a new Chart instance
        if (chartRef.current) {
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
      } }catch (error) {
        console.error('Error fetching or rendering the chart:', error);
      }
    };
        populateProjectTasksChart();
      
  }, [token,chartRef]);

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