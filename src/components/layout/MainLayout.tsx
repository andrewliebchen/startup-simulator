import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
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
              <a href="#" className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded"># general</a>
              <a href="#" className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded"># product</a>
              <a href="#" className="block px-2 py-1 text-gray-300 hover:bg-gray-800 rounded"># random</a>
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