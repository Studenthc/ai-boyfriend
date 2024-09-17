import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { List, ListItem, Typography, Button } from '@mui/material';
import { MdDashboard, MdShoppingCart, MdPeople, MdBarChart, MdLayers, MdHelp, MdSettings, MdExitToApp } from 'react-icons/md';
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { text: 'Overview', icon: <MdDashboard /> },
  { text: 'Orders', icon: <MdShoppingCart /> },
  { text: 'Customers', icon: <MdPeople /> },
  { text: 'Reports', icon: <MdBarChart /> },
  { text: 'Integrations', icon: <MdLayers /> },
  { text: 'Help Center', icon: <MdHelp /> },
  { text: 'Settings', icon: <MdSettings /> },
  { text: 'Logout', icon: <MdExitToApp /> },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`${styles.sidebar} ${className} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-10`}>
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-xl font-bold text-[#4CAF50]">bestaiboy</h1>
          <Badge variant="secondary" className="bg-[#e8f5e9] text-[#4CAF50]">
            .com
          </Badge>
        </div>
        <List className={styles.menuList}>
          {menuItems.map((item) => (
            <ListItem key={item.text} className={styles.navItem}>
              <a href="#" className={styles.navLink} onClick={() => setIsOpen(false)}>
                <span className={styles.icon}>{item.icon}</span>
                {item.text}
              </a>
            </ListItem>
          ))}
        </List>
        <Button className={styles.upgradeButton}>
          UPGRADE TO PRO
        </Button>
      </div>
    </>
  );
};

export default Sidebar;

