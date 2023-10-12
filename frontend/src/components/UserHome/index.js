import React from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom';
import Schedule from '../Schedule';

function UserHome() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if(!token){
     navigate('/login')
    }
  return (
    <div>
        <Sidebar/>
        <Schedule/>
    </div>
  )
}

export default UserHome