import React from 'react';
import { Message, Channel } from '@/lib/types';
import ChatMessage from './ChatMessage';

interface ChatChannelProps {
  channel: Channel;
  messages: Message[];
}

export default function ChatChannel({ channel, messages }: ChatChannelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Channel header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">{channel}</h2>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      
    </div>
  );
} 