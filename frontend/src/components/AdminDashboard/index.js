import React from 'react'

function AdminDashboad() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  console.log(token);
  console.log(role);
  return (
    role == "true" ?
    <div className='mt-20'>AdminDashboad</div> : 
    <h1 style={{color:'red'}} >You are not authorized to view this page.</h1>
  )
}

export default AdminDashboad