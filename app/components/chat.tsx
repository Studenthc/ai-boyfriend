"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import Markdown from "react-markdown";

type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage: React.FC<{ text: string; avatarUrl?: string }> = ({ text, avatarUrl }) => {
  return (
    <div className={styles.assistantMessageContainer}>
      {avatarUrl && <img src={avatarUrl} alt="Assistant" className={styles.avatar} />}
      <div className={styles.assistantMessage}>
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.codeMessage}>
      {text.split("\n").map((line, index) => (
        <div key={index}>
          <span>{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

const Message: React.FC<MessageProps & { avatarUrl?: string }> = ({ role, text, avatarUrl }) => {
  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={text} avatarUrl={avatarUrl} />;
    case "code":
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};

type ChatProps = {
  functionCallHandler?: (toolCall: any) => Promise<string>;
  avatarUrl?: string;
  characterPrompt?: string;
  characterName: string; // Add this line
};

const Chat: React.FC<ChatProps> = ({
  functionCallHandler = () => Promise.resolve(""),
  avatarUrl,
  characterPrompt = "",
  characterName,
}) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat_messages_${characterName}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Only add the welcome message if there are no stored messages
      setMessages([{ role: "assistant", text: "Hello! It's really nice to finally meet you!" }]);
    }
    setIsInitialized(true);
  }, [characterName]);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const messagesToStore = messages.slice(-100); // Store only the last 100 messages
      localStorage.setItem(`chat_messages_${characterName}`, JSON.stringify(messagesToStore));
    }
  }, [messages, characterName]);

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // create a new threadID when chat component created
  useEffect(() => {
    const createThread = async () => {
      if (!isInitialized) return; // Wait for initialization
      
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, [isInitialized]);

  const sendMessage = async (text: string) => {
    setInputDisabled(true);
    try {
      const response = await fetch(
        `/api/assistants/threads/${threadId}/messages`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: text,
            characterPrompt: characterPrompt,
          }),
        }
      );

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      appendMessage("assistant", "");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        appendToLastMessage(chunk);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      appendMessage("assistant", "Sorry, an error occurred while processing your message.");
    } finally {
      setInputDisabled(false);
    }
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit");

    e.preventDefault();
    if (!userInput.trim()) return;
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
  
    sendMessage(userInput);
    setUserInput("");
    setInputDisabled(true);
    scrollToBottom();
  };

  const appendToLastMessage = (text: string) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  const appendMessage = (role: "user" | "assistant" | "code", text: string) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.role === role && lastMessage.text === text) {
        return prevMessages; // Don't add if it's a duplicate of the last message
      }
      return [...prevMessages, { role, text }];
    });
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            role={msg.role} 
            text={msg.text} 
            avatarUrl={avatarUrl}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={inputDisabled}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;