"use client";

import React from "react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from "./page.module.css";
import Chat from "../../components/chat";

const ChatContent = () => {
  const searchParams = useSearchParams();
  const avatarUrl = searchParams.get('avatar');
  const name = searchParams.get('name') || 'AI Assistant';
  const prompt = searchParams.get('prompt') || '';

  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        {avatarUrl && (
          <Image 
            src={avatarUrl} 
            alt={name} 
            layout="fill" 
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        )}
      </div>
      <div className={styles.chatContainer}>
        <Chat avatarUrl={avatarUrl || undefined} characterPrompt={prompt} />
      </div>
    </main>
  );
};

export default ChatContent;