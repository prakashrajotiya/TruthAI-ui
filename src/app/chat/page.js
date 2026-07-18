'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatUI from '../../components/ChatUI';
import styles from '../../styles/Chat.module.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function ChatPage() {
  const [hasData, setHasData] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/has-data`);
        const data = await response.json();
        setHasData(data.hasData);
      } catch (error) {
        console.error("Failed to check data", error);
      } finally {
        setLoading(false);
      }
    };
    checkData();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col ${styles.chatWrapper}`}>
        {/* Skeleton Header */}
        <div className={styles.chatHeader}>
          <div className={`skeleton ${styles.skeletonHeaderLogo}`}></div>
          <div className={`skeleton ${styles.skeletonHeaderBtn}`}></div>
        </div>
        
        {/* Skeleton Chat Area */}
        <div className={styles.skeletonChatArea}>
          {/* Bot bubble */}
          <div className={styles.skeletonBotRow}>
            <div className={`skeleton ${styles.skeletonBotAvatar}`}></div>
            <div className={`skeleton ${styles.skeletonBotBubble}`}></div>
          </div>
          {/* User bubble */}
          <div className={styles.skeletonUserRow}>
            <div className={`skeleton ${styles.skeletonUserBubble}`}></div>
            <div className={`skeleton ${styles.skeletonUserAvatar}`}></div>
          </div>
        </div>

        {/* Skeleton Input Area */}
        <div className={styles.skeletonInputArea}>
          <div className={`skeleton ${styles.skeletonInputField}`}></div>
        </div>
      </div>
    );
  }

  const handleAdminLogin = () => {
    router.push('/admin');
  };

  return <ChatUI backendUrl={BACKEND_URL} hasData={hasData} onAdminClick={handleAdminLogin} />;
}
