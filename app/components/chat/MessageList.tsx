
import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
}

const MessageList = ({ messages, className = '' }: MessageListProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    return messages.reduce((groups: { [key: string]: Message[] }, message) => {
      const date = message.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className={`space-y-8 ${className}`}>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center">
            <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
              {date}
            </span>
          </div>
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[70%]">
                {message.sender === 'ai' && (
                  <div className="p-1 bg-blue-100 rounded-full">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`
                    p-3 rounded-lg
                    ${message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'}
                  `}
                >
                  <p className="whitespace-pre-wrap mb-1">{message.content}</p>
                  <span className="text-xs opacity-75">
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                {message.sender === 'user' && (
                  <div className="p-1 bg-blue-600 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MessageList;