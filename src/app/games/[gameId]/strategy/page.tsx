'use client';

import { useState, useEffect } from 'react';
import StrategyEditor from '@/components/editor/StrategyEditor';
import { useParams } from 'next/navigation';

export default function StrategyPage() {
  const params = useParams();
  const gameId = params.gameId as string;
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch the current strategy document
    const fetchStrategy = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}/documents?type=strategy`);
        if (response.ok) {
          const data = await response.json();
          setContent(data.content || '');
        }
      } catch (error) {
        console.error('Failed to fetch strategy:', error);
      }
    };

    fetchStrategy();
  }, [gameId]);

  const handleSave = async (newContent: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/games/${gameId}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'strategy',
          content: newContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save strategy');
      }

      setContent(newContent);
    } catch (error) {
      console.error('Failed to save strategy:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full">
      <StrategyEditor
        gameId={gameId}
        initialContent={content}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
} 