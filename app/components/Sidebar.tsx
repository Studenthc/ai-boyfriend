import React, { useState, useCallback } from 'react';
import styles from './Sidebar.module.css';
import { List, ListItem, Typography, Button } from '@mui/material';
import { MdDashboard, MdShoppingCart, MdPeople, MdBarChart, MdLayers, MdHelp, MdSettings, MdExitToApp } from 'react-icons/md';
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
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    setIsOpen(false);
    router.push(path);
  }, [router]);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <div 
        className={`${styles.sidebar} ${className} ${isOpen ? styles.open : ''} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-20`}
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
        {/* <Button className={styles.upgradeButton} variant="contained">
          UPGRADE TO PRO
        </Button> */}
        <Button className={styles.upgradeButton} variant="contained">
          MORE FEATURE UPCOMING!
        </Button>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

