'use client';

import { useState, useEffect } from 'react';

interface GameControlsProps {
  isGameStarted: boolean;
  onStartGame: () => void;
  onAdvanceTurn: () => void;
  autoTurnInterval?: number; // in seconds
}

export default function GameControls({
  isGameStarted,
  onStartGame,
  onAdvanceTurn,
  autoTurnInterval = 60, // default 60 seconds
}: GameControlsProps) {
  const [isLurkerMode, setIsLurkerMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(autoTurnInterval);

  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onAdvanceTurn();
          return autoTurnInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, isPaused, onAdvanceTurn, autoTurnInterval]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isGameStarted ? (
            <button
              onClick={onStartGame}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              Start Game
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <div className="text-lg font-mono">
                Next turn in: {formatTime(timeRemaining)}
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isLurkerMode}
              onChange={(e) => setIsLurkerMode(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Lurker Mode</span>
          </label>
        </div>
      </div>
    </footer>
  );
} 