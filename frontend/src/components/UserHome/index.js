import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import Schedule from '../Schedule';
import CreateProject from '../CreateProject'

function UserHome() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    return (
        <div>
            <Sidebar />
            {/* <Schedule /> */}
            <CreateProject/>
        </div>
    );
}

export default UserHome;
