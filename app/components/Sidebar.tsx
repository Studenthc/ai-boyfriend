import React, { useState, useCallback } from 'react';
import styles from './Sidebar.module.css';
import { List, ListItem, Typography, Button } from '@mui/material';
import { MdDashboard, MdMenu } from 'react-icons/md';
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';

const menuItems = [
  { text: 'Overview', icon: <MdDashboard />, path: '/' },
  // { text: 'Chat', icon: <MdPeople />, path: '/examples/basic-chat/' },
  // { text: 'Orders', icon: <MdShoppingCart />, path: '/orders' },
  // { text: 'Customers', icon: <MdPeople />, path: '/customers' },
  // { text: 'Reports', icon: <MdBarChart />, path: '/reports' },
  // { text: 'Help Center', icon: <MdHelp />, path: '/help' },
  // { text: 'Settings', icon: <MdSettings />, path: '/settings' },
  // { text: 'Logout', icon: <MdExitToApp />, path: '/logout' },
];

interface SidebarProps {
  className?: string;
  isVisible: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isVisible, onToggle }) => {
  const router = useRouter();

  const handleNavigation = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <>
      <button 
        className={`${styles.toggleButton} ${isVisible ? styles.visible : ''}`}
        onClick={onToggle}
      >
        <MdMenu />
      </button>
      <div 
        className={`${styles.sidebar} ${className} ${isVisible ? styles.visible : ''}`}
      >
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-xl font-bold text-[#4CAF50]">bestaiboy</h2>
          <Badge variant="secondary" className="bg-[#e8f5e9] text-[#4CAF50]">
            .com
          </Badge>
        </div>
        <List className={styles.menuList}>
          {menuItems.map((item) => (
            <ListItem key={item.text} className={styles.navItem}>
              <button 
                className={styles.navLink}
                onClick={() => handleNavigation(item.path)}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.text}
              </button>
            </ListItem>
          ))}
        </List>
        <Button className={styles.upgradeButton} variant="contained">
          MORE FEATURE UPCOMING!
        </Button>
      </div>
    </>
  );
};

export default Sidebar;