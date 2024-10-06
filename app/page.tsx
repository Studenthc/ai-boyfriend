"use client";

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CharacterGrid from './components/CharacterGrid';
import FAQ from './components/FAQ';
import styles from './page.module.css'

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      <Sidebar className="w-full md:w-64 flex-shrink-0" isVisible={isSidebarVisible} onToggle={toggleSidebar} />
      <main className={`${styles.main} flex-grow overflow-y-auto p-4 md:p-8`}>
        <div className="min-h-full">
          <header>
            <h1 className="text-3xl font-bold mb-4">Welcome to Your AI Boyfriend Experience</h1>
          </header>
          <section>
            <p className="mb-6">
              At BestAIBoy.com, we bring you the future of companionship. Our AI boyfriends are designed to provide 
              meaningful conversations, emotional support, and a unique relationship experience tailored just for you.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Choose Your AI Boyfriend</h2>
            <CharacterGrid className="h-full" />
          </section>
          <section>
            <FAQ />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
