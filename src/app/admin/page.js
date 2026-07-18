'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IngestUI from '../../components/IngestUI';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default function AdminPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Check if authenticated
    const authStatus = localStorage.getItem('truthai-admin-auth');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAuthed(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('truthai-admin-auth');
    router.push('/chat');
  };

  if (!isAuthed) return null; // Prevent flash of admin content

  return (
    <IngestUI
      onBack={() => router.push('/chat')}
      handleLogout={handleLogout}
      backendUrl={BACKEND_URL}
    />
  );
}
