'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const params = useParams();
  const gameId = params.gameId as string;

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
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 