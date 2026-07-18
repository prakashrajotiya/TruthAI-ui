'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '../../components/AdminLogin';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const isAuthed = localStorage.getItem('truthai-admin-auth');
    if (isAuthed === 'true') {
      router.push('/admin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('truthai-admin-auth', 'true');
      router.push('/admin');
    } else {
      setStatus('Invalid password');
    }
  };

  const handleBack = () => {
    router.push('/chat');
  };

  if (isLoading) return null; // Prevent flash of login screen if already authed

  return (
    <AdminLogin
      handleLogin={handleLogin}
      password={password}
      setPassword={setPassword}
      status={status}
      onBack={handleBack}
    />
  );
}
