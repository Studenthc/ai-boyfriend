import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { List, ListItem, Typography, Button } from '@mui/material';
import { MdDashboard, MdShoppingCart, MdPeople, MdBarChart, MdLayers, MdHelp, MdSettings, MdExitToApp } from 'react-icons/md';
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';

const menuItems = [
  { text: 'Overview', icon: <MdDashboard />, path: '/' },
  { text: 'Orders', icon: <MdShoppingCart />, path: '/orders' },
  { text: 'Customers', icon: <MdPeople />, path: '/customers' },
  { text: 'Reports', icon: <MdBarChart />, path: '/reports' },
  { text: 'Integrations', icon: <MdLayers />, path: '/integrations' },
  { text: 'Help Center', icon: <MdHelp />, path: '/help' },
  { text: 'Settings', icon: <MdSettings />, path: '/settings' },
  { text: 'Logout', icon: <MdExitToApp />, path: '/logout' },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

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
              <a 
                href="#" 
                className={styles.navLink} 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.path);
                }}
              >
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

