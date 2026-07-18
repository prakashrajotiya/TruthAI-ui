import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Admin.module.css';

export default function IngestUpload({ setSelectedFile, handleUpload, selectedFile, loading, status, setCurrentView }) {
  const [dragActive, setDragActive] = useState(false);
  const [step, setStep] = useState(-1);
  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    if (loading) {
      setStep(0);
      const timers = [
        setTimeout(() => setStep(1), 1500),
        setTimeout(() => setStep(2), 4000),
        setTimeout(() => setStep(3), 8000)
      ];
      return () => timers.forEach(clearTimeout);
    } else if (status && status.toLowerCase().includes('success')) {
      setStep(4);
    } else {
      setStep(-1);
    }
  }, [loading, status]);

  const stepsText = [
    "Uploading PDF to server...",
    "Extracting text content...",
    "Generating Vector Embeddings (this may take a minute)...",
    "Saving chunks to Vector Database..."
  ];

  return (
    <div className={styles.panelCard}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderTitle}>
          <div className={styles.panelIconBox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </div>
          <h3 className={styles.panelTitleText}>Upload Document</h3>
        </div>
        <button onClick={() => setCurrentView('list')} className={`btn btn-secondary ${styles.panelActionBtn}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          View Documents
        </button>
      </div>

      <div className={styles.freeTierNotice}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.noticeIcon}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <span><strong>Free Tier Notice:</strong> Please upload text-based PDFs or very small scanned files to avoid hitting AI quota limits during OCR.</span>
      </div>

      <div className={styles.sampleFilesBox}>
        <div className={styles.sampleFilesTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <strong className={styles.sampleFilesTitleText}>Want to test it out? Use these sample files!</strong>
        </div>
        <div className={styles.sampleFilesList}>
          <a href="/samples/HR_Policy.pdf" download className={`btn ${styles.sampleFileBtn}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            HR_Policy.pdf
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.25rem' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
          <a href="/samples/Leave_Guidelines.pdf" download className={`btn ${styles.sampleFileBtn}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Leave_Guidelines.pdf
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.25rem' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      </div>

      {!loading && step !== 4 && (
        <div
          className="flex flex-col gap-4"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div
            className={`${styles.dropzone} ${dragActive ? styles.dropzoneHover : ""}`}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <div className={styles.dropzoneIconBox}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <div className={styles.dropzoneTitle}>Drag & drop your PDF</div>
            <div className={styles.dropzoneSubtitle}>or click to browse from your computer</div>
            {selectedFile && (
              <div className={styles.selectedFilePill}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                {selectedFile.name}
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`btn btn-primary ${styles.startProcessingBtn}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Start Processing
          </button>

          {status && !status.toLowerCase().includes('success') && (
            <div className={styles.uploadErrorBox}>{status}</div>
          )}
        </div>
      )}

      {(loading || step === 4) && (
        <div className={styles.uploadProgressBox}>
          <div className="flex flex-col gap-4">
            {stepsText.map((text, idx) => {
              if (idx > step && step !== 4) return null;

              const isCompleted = step > idx || step === 4;
              const isActive = step === idx && step !== 4;

              return (
                <div key={idx} className="animate-fade-in flex flex-col gap-2">
                  <div className={styles.progressStep}>
                    {isCompleted ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <div className={styles.spinner}></div>
                    )}
                    <span className={`${styles.progressStepText} ${isActive ? styles.progressStepActive : styles.progressStepInactive}`}>
                      {text}
                    </span>
                  </div>
                  {idx === 0 && isActive && (
                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBarAnimated}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {step === 4 && (
            <div className={`animate-fade-in ${styles.uploadSuccessBox}`}>
              <div className={styles.uploadSuccessText}>✓ {status}</div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button className={`btn btn-secondary ${styles.uploadAnotherBtn}`} onClick={() => { setSelectedFile(null); setStep(-1); }} style={{ margin: 0, flex: 1 }}>
                  Upload Another Document
                </button>
                <Link href="/chat" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>
                  Start Chat
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
