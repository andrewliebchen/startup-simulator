import React from 'react';
import { Message } from '@/lib/types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-50">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {message.employeeId.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{message.employeeId}</span>
          <span className="text-sm text-gray-500">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-900">{message.content}</p>
      </div>
    </div>
  );
} 