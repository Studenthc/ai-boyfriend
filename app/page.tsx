"use client";

import React from 'react';
import Sidebar from './components/Sidebar';
import CharacterGrid from './components/CharacterGrid';
import styles from './page.module.css'

const Home = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar className="w-64 flex-shrink-0" />
      <main className={`${styles.main} flex-grow overflow-hidden`}>
        <CharacterGrid className="h-full" />
      </main>
    </div>
  );
};

export default Home;
