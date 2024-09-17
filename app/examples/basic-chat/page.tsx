import React, { Suspense } from 'react';
import ChatContent from './ChatContent';

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
};

export default Home;