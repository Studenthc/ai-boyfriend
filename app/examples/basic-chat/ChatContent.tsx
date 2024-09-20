"use client";

import React, { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from "./page.module.css";
import Chat from "../../components/chat";

const ChatContentInner = () => {
  const searchParams = useSearchParams();
  const avatarUrl = searchParams.get('avatar');
  const name = searchParams.get('name') || 'AI Assistant';
  const prompt = searchParams.get('prompt') || '';

  // 构建基本的 canonical URL
  const baseCanonicalUrl = 'https://bestaiboy.com/examples/basic-chat';
  
  // 如果有 name 参数，将其添加到 canonical URL
  const canonicalUrl = name !== 'AI Assistant' 
    ? `${baseCanonicalUrl}?name=${encodeURIComponent(name)}`
    : baseCanonicalUrl;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
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
    </>
  );
};

const ChatContent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChatContentInner />
  </Suspense>
);

export default ChatContent;