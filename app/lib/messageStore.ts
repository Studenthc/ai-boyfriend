type MessageRole = 'system' | 'user' | 'assistant';

type Message = {
    role: MessageRole;
    content: string;
  };
  
  const threads: { [key: string]: Message[] } = {};
  const MAX_MESSAGES = 100; // 设置最大消息数
  
  export const messageStore = {
    addMessage: (threadId: string, message: Message) => {
      if (!threads[threadId]) {
        threads[threadId] = [];
      }
      threads[threadId].push(message);
      // 如果消息数超过限制，删除最旧的消息
      if (threads[threadId].length > MAX_MESSAGES) {
        threads[threadId] = threads[threadId].slice(-MAX_MESSAGES);
      }
    },
    getMessages: (threadId: string): Message[] => {
      return threads[threadId] || [];
    },
    createThread: (threadId: string) => {
      threads[threadId] = [];
    }
  };