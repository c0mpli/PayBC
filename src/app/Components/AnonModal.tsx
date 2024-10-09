"use client"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import '../style/Card.css'
import AnonLogin from './AnonLogin';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className='action' onClick={showModal} style={{display:"flex" , justifyContent:"center"}}>
       Click to Verify
      </Button>
      <Modal footer={null} title="Verify your aadhar card" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <div style={{fontSize:"20px" , fontWeight:600}}>
            <p>What you want as to use</p>
         </div>
         <div>
            
         </div>
         <div style={{marginTop:"10px 0 10px 0" , fontWeight:"500"}}>
            Use the QR of your Aadhar card 
         </div>
         <div style={{marginTop:"10px"}}>
            <AnonLogin/>
         </div>
      </Modal>
    </>
  );
};

export default App;