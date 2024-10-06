"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from "./page.module.css";
import Chat from "../../components/chat";
import Sidebar from "../../components/Sidebar";

const ChatContentInner = () => {
  const searchParams = useSearchParams();
  const avatarUrl = searchParams.get('avatar');
  const name = searchParams.get('name') || 'AI Assistant';
  const prompt = searchParams.get('prompt') || '';
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const baseCanonicalUrl = 'https://bestaiboy.com/examples/basic-chat';
  const canonicalUrl = name !== 'AI Assistant' 
    ? `${baseCanonicalUrl}?name=${encodeURIComponent(name)}`
    : baseCanonicalUrl;

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Sidebar isVisible={isSidebarVisible} onToggle={toggleSidebar} />
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          {avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt={`AI character ${name} - Your virtual companion for meaningful conversations`} 
              layout="fill" 
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          ) : (
            <div className={styles.placeholderImage}>
              No image available for {name}
            </div>
          )}
        </div>
        <div className={styles.chatContainer}>
          <Chat avatarUrl={avatarUrl || undefined} characterPrompt={prompt} />
        </div>
      </main>
    </>
  );
};

const ChatContent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChatContentInner />
  </Suspense>
);

export default ChatContent;