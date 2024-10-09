// Page.tsx
"use client"
import { Form, Input, Select } from 'antd';
import React from 'react';
import bank from '../../assests/bank_585120.png';
import Image from 'next/image';
import Nav from '@/app/Components/Nav';
import Card from 'antd/es/card/Card';
import { UserOutlined } from '@ant-design/icons';
import { BlockOptions } from '@/app/Options/BlockOptions';
import { UnitOptions } from '@/app/Options/UnitOptions';
import TransactionCard from '@/app/Components/TransactionCard';
import Transfercard from '@/app/Components/Transfercard';
import phone from  "../../../assets/vadim-artyukhin-H4OdSlgzFig-unsplash-removebg.png"

export default function Page() {
 

  return (
    <div>
      <Nav />
      <div style={{ marginTop:"-6%"}}>
        <Transfercard /> 
      </div>
   
   </div>
  );
}




