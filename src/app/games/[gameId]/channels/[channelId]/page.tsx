'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ChatChannel from '@/components/chat/ChatChannel';
import { Message, Channel } from '@/lib/types';

export default function ChannelPage() {
  const params = useParams();
  const gameId = params.gameId as string;
  const channelId = params.channelId as Channel;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}/messages?channel=${channelId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [gameId, channelId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ChatChannel channel={channelId} messages={messages} />
    </div>
  );
} 