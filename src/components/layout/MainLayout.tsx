'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import GameControls from './GameControls';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const params = useParams();
  const gameId = params.gameId as string;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/games/${gameId}/start`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to start game');
      }

      const data = await response.json();
      if (data.success) {
        setIsGameStarted(true);
      } else {
        throw new Error(data.error || 'Failed to start game');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start game');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvanceTurn = () => {
    // TODO: Implement turn advancement logic
    console.log('Advancing turn...');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Startup Simulator</h1>
        </div>
        <nav className="mt-4">
          <div className="px-4 py-2">
            <h2 className="text-sm font-semibold text-gray-400 uppercase">Channels</h2>
            <div className="mt-2 space-y-1">
              <Link href={`/games/${gameId}/channels/general`} className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded"># general</Link>
              <Link href={`/games/${gameId}/channels/product`} className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded"># product</Link>
              <Link href={`/games/${gameId}/channels/random`} className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded"># random</Link>
            </div>
          </div>
          <div className="px-4 py-2 mt-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase">Documents</h2>
            <div className="mt-2 space-y-1">
              <Link href={`/games/${gameId}/strategy`} className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded">Strategy Document</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {children}
        </main>
        <GameControls
          isGameStarted={isGameStarted}
          onStartGame={handleStartGame}
          onAdvanceTurn={handleAdvanceTurn}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 