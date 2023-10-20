import React from 'react'
import { useState } from 'react';
import Modal from '../Modal';

function AddMember() {
  const token  = localStorage.getItem('token')
  if (!token){
    window.location.href = "/login"
  }
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className=' ml-80 mt-10'>
    <button
      className="bg-primary text-white p-2 rounded-md"
      onClick={openModal}
    >
      Add Member
    </button>
    <Modal isOpen={isModalOpen} onClose={closeModal} />
  </div>
  )
}

export default AddMember