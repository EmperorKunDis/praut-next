import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Tldraw, Editor, TLUiOverrides } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { Bot, Save, Share, Settings } from 'lucide-react';

// Custom toolbar component for AI actions
const AiToolbar = ({ editor }: { editor: Editor }) => {
  const handleAiAssist = useCallback(() => {
    // TODO: Implement AI assistance
    console.log('AI assist requested');
  }, []);

  const handleAiGenerate = useCallback(() => {
    // TODO: Implement AI generation
    console.log('AI generation requested');
  }, []);

  const handleAiAnalyze = useCallback(() => {
    // TODO: Implement AI analysis
    console.log('AI analysis requested');
  }, []);

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-lg">
      <button
        onClick={handleAiAssist}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
        title="AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </button>
      <button
        onClick={handleAiGenerate}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
        title="Generate with AI"
      >
        <Bot className="w-6 h-6" />
      </button>
      <button
        onClick={handleAiAnalyze}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
        title="Analyze with AI"
      >
        <Bot className="w-6 h-6" />
      </button>
    </div>
  );
};

// Custom top bar component
const TopBar = ({ editor }: { editor: Editor }) => {
  const handleSave = useCallback(() => {
    // TODO: Implement save functionality
    console.log('Save requested');
  }, []);

  const handleShare = useCallback(() => {
    // TODO: Implement share functionality
    console.log('Share requested');
  }, []);

  const handleSettings = useCallback(() => {
    // TODO: Implement settings
    console.log('Settings requested');
  }, []);

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Save className="w-4 h-4" />
        Save
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Share className="w-4 h-4" />
        Share
      </button>
      <button
        onClick={handleSettings}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
};

interface WhiteboardProps {
  roomId?: string;
  readOnly?: boolean;
  className?: string;
}

const Whiteboard = ({ roomId, readOnly = false, className = '' }: WhiteboardProps) => {
  const handleMount = useCallback((editor: Editor) => {
    // TODO: Initialize any required editor settings or state
    console.log('Editor mounted');
  }, []);

  const uiOverrides: TLUiOverrides = {
    // Customize tldraw UI as needed
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Tldraw
        onMount={handleMount}
        readOnly={readOnly}
        showPages={false}
        showMultiplayerMenu={false}
        overrides={uiOverrides}
      >
        <TopBar />
        <AiToolbar />
      </Tldraw>
    </div>
  );
};

// Use dynamic import with SSR disabled for tldraw
export default dynamic(() => Promise.resolve(Whiteboard), { ssr: false });