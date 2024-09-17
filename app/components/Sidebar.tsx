import React from 'react';
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
  return (
    <div className={`${styles.sidebar} ${className}`}>
      {/* <Typography variant="h6" className={styles.logo}>Your Logo</Typography> */}

      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-[#4CAF50]">bestaiboy</h1>
        <Badge variant="secondary" className="bg-[#e8f5e9] text-[#4CAF50]">
          .com
        </Badge>
      </div>
      <List className={styles.menuList}>
        {menuItems.map((item) => (
          <ListItem key={item.text} className={styles.navItem}>
            <a href="#" className={styles.navLink}>
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
  );
};

export default Sidebar;

