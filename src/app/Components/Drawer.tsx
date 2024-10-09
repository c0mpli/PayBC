import React, { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Space } from 'antd';
import Connect from './ConnectButton';
import '../style/Drawer.css'

export const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space>
       
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="PayOn"
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        
      > 
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
       <h5>Home</h5>
       <h5>How To Use</h5>
        <h5><Connect /></h5>
      </div>
        
      </Drawer>
    </>
  );
};

