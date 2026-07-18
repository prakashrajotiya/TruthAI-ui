'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import IngestUpload from './IngestUpload';
import IngestFileList from './IngestFileList';
import styles from '../styles/Admin.module.css';

export default function IngestUI({ onBack, handleLogout, backendUrl }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [currentView, setCurrentView] = useState('list'); // 'upload' or 'list'
  const [isLoadingList, setIsLoadingList] = useState(true);

  // Reset upload state when leaving the upload view
  useEffect(() => {
    if (currentView === 'list') {
      setStatus('');
      setSelectedFile(null);
    }
  }, [currentView]);

  const fetchFiles = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch(`${backendUrl}/ingest/list`, { cache: 'no-store' });
      const data = await res.json();
      setFiles(data.files || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setStatus('Extracting text and generating embeddings... this may take a moment.');
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    const fileName = selectedFile.name; // Store name before clearing

    try {
      const res = await fetch(`${backendUrl}/ingest`, { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setStatus(`Successfully uploaded ${data.chunks} chunks from PDF!`);
        // Optimistically update the list immediately
        setFiles(prev => {
          if (!prev.includes(fileName)) return [...prev, fileName];
          return prev;
        });
        fetchFiles(); // Sync with server
        setSelectedFile(null);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (e) {
      setStatus(`Upload failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/ingest/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });
      if (res.ok) fetchFiles();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.ingestWrapper}>
      
      {/* Background Decorative Blobs */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={styles.ingestContainer}
      >
        <div className={styles.ingestHeader}>
          <div className={styles.ingestHeaderLeft}>
            <button onClick={onBack} className={styles.ingestTitleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              TruthAI Chatbot
            </button>
            <div className={styles.ingestDivider}></div>
            <div>
              <h2 className={styles.ingestTitle}>
                Admin Dashboard
              </h2>
              <p className={styles.ingestSubtitle}>
                Manage your knowledge base and upload new documents.
              </p>
            </div>
          </div>
          <div>
            <button onClick={handleLogout} className={`btn btn-secondary ${styles.logoutBtn}`}>Logout</button>
          </div>
        </div>

        <div>
          {currentView === 'upload' ? (
            <IngestUpload setSelectedFile={setSelectedFile} handleUpload={handleUpload} selectedFile={selectedFile} loading={loading} status={status} setCurrentView={setCurrentView} />
          ) : (
            <IngestFileList files={files} handleRemove={handleRemove} isLoading={isLoadingList} setCurrentView={setCurrentView} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
