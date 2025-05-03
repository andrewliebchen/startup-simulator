'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;

  useEffect(() => {
    // Redirect to the general channel by default
    router.push(`/games/${gameId}/channels/general`);
  }, [gameId, router]);

  return null; // This page will redirect immediately
} 