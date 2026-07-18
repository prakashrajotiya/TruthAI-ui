import React from 'react';
import styles from '../styles/Admin.module.css';

export default function IngestFileList({ files, handleRemove, isLoading, setCurrentView }) {
  return (
    <div className={styles.panelCard}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderTitle}>
          <div className={styles.panelIconBox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3 className={styles.panelTitleText}>Uploaded Documents</h3>
        </div>
        <button onClick={() => setCurrentView('upload')} className={`btn btn-primary ${styles.panelActionBtn}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Upload Document
        </button>
      </div>

      {isLoading ? (
        <ul className={styles.fileList}>
          {[1, 2, 3].map(i => (
            <li key={i} className={styles.fileRow}>
              <div className={styles.skeletonRowLeft}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonText} style={{ width: `${40 + Math.random() * 30}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      ) : files.length === 0 ? (
        <div className={styles.emptyStateContainer}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyStateIcon}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div className={styles.emptyStateTitle}>No Documents Yet</div>
          <p className={styles.emptyStateDesc}>Upload a PDF to start building your knowledge base.</p>
        </div>
      ) : (
        <ul className={styles.fileList}>
          {files.map(f => (
            <li key={f} className={styles.fileRow}>
              <div className={styles.fileRowLeft}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                <span className={styles.fileName}>{f}</span>
              </div>
              <button className={styles.btnTrash} onClick={() => handleRemove(f)} title="Delete document">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
