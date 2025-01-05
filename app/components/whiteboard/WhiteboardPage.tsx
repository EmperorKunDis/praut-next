import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Whiteboard from './Whiteboard';

const WhiteboardPage = () => {
  const router = useRouter();
  const { id: roomId } = router.query;

  useEffect(() => {
    // Handle any page-level initialization
    // For example: connecting to WebSocket, loading saved state, etc.
  }, [roomId]);

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-1 relative">
        <Whiteboard
          roomId={roomId as string}
          className="absolute inset-0"
        />
      </div>
    </main>
  );
};

export default WhiteboardPage;