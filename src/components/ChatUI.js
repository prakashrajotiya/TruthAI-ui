'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputForm from './ChatInputForm';
import styles from '../styles/Chat.module.css';

export default function ChatUI({ backendUrl, onAdminClick, hasData }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [availableDocs, setAvailableDocs] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('truthai-history');
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('truthai-history', JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('truthai-history');
    }
  };

  useEffect(() => {
    fetch(`${backendUrl}/ingest/suggestions`)
      .then(res => res.json())
      .then(data => setSuggestions(data.suggestions || []))
      .catch(console.error);
      
    if (hasData) {
      fetch(`${backendUrl}/ingest/list`)
        .then(res => res.json())
        .then(data => {
          setAvailableDocs(data.files || []);
          setSelectedDocs(data.files || []); 
        })
        .catch(console.error);
    }
  }, [backendUrl, hasData]);

  const isInitialScroll = useRef(true);

  useEffect(() => {
    if (isLoaded && isInitialScroll.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      // Use setTimeout to ensure the DOM has painted the auto scroll before enabling smooth scroll
      setTimeout(() => {
        isInitialScroll.current = false;
      }, 100);
    } else if (!isInitialScroll.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isLoaded]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleSend = async (textToUse) => {
    const text = textToUse || input;
    if (!text.trim()) return;

    if (!hasData) {
      setMessages(prev => [...prev, { role: 'user', text }, { role: 'model', text: 'Warning: Your company data is not added yet. Please upload documents to start querying.' }]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-5);
      const res = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, selectedDocs })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: data.response,
          confidence: data.confidence,
          sources: data.sources,
          relatedQuestions: data.relatedQuestions
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `Error: ${data.error}` }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Network error connecting to the backend.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <div className={`animate-fade-in ${styles.chatWrapper} ${isFullScreen ? 'fullscreen' : ''}`}>
      <ChatHeader onAdminClick={onAdminClick} isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} clearChat={clearChat} />
      <ChatMessageList messages={messages} hasData={hasData} onAdminClick={onAdminClick} suggestions={suggestions} handleSend={handleSend} loading={loading} messagesEndRef={messagesEndRef} />
      <ChatInputForm 
        inputRef={inputRef} 
        handleSend={handleSend} 
        input={input} 
        setInput={setInput} 
        loading={loading} 
        hasData={hasData} 
        availableDocs={availableDocs}
        selectedDocs={selectedDocs}
        setSelectedDocs={setSelectedDocs}
      />
    </div>
  );
}