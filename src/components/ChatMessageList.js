import React from 'react';
import ChatLoadingSteps from './ChatLoadingSteps';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Chat.module.css';

export default function ChatMessageList({ messages, hasData, onAdminClick, suggestions, handleSend, loading, messagesEndRef }) {
  return (
    <div className={styles.messageListWrapper}>
      
      {/* Subtle Chat Background Texture */}
      <div className={styles.chatBackgroundTexture} />

      <div className={styles.messageListInner}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            {!hasData ? (
              <div className={styles.warningBox}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.warningIcon}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <h3 className={styles.warningTitle}>Warning: No Documents Uploaded</h3>
                <p className={styles.warningText}>Your company data is not added yet. Please upload documents to start querying.</p>
                <button onClick={onAdminClick} className="btn btn-primary" style={{ width: '100%' }}>Upload Document</button>
              </div>
            ) : (
              <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.welcomeIcon}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <h3 className={styles.welcomeTitle}>How can I help you today?</h3>
                <p className={styles.welcomeText}>Ask any questions based on the uploaded company data. Our AI will provide accurate answers.</p>

                {suggestions.length > 0 && (
                  <div className={styles.suggestionsWrapper}>
                    <p className={styles.suggestionsTitle}>Suggested Questions:</p>
                    {suggestions.map((sug, i) => (
                      <button key={i} className={`btn btn-secondary ${styles.suggestionBtn}`} onClick={() => handleSend(sug)}>
                        {sug.replace(/^[-*]\s*/, '').replace(/^[0-9]+\.\s*/, '')}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={styles.messageRow} style={{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              
              {msg.role === 'model' && (
                <div className={styles.aiAvatar}>
                  TA
                </div>
              )}

              <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleModel}`}>
                {msg.role === 'user' ? (
                  <div>{msg.text}</div>
                ) : (
                  <div className={styles.modelContentFlex}>
                    <ReactMarkdown className={styles.markdownContent}>{msg.text}</ReactMarkdown>

                    {msg.confidence !== undefined && (
                      <div className={styles.confidenceSection}>
                        <div className={styles.sectionTitle}>Confidence Score</div>
                        <div className={styles.confidenceBarFlex}>
                          <div className={styles.confidenceBarTrack}>
                            <div className={styles.confidenceBarFill} style={{ width: `${msg.confidence}%` }}></div>
                          </div>
                          <span className={styles.confidencePercent}>{msg.confidence}%</span>
                        </div>
                      </div>
                    )}

                    {msg.sources && msg.sources.length > 0 && (
                      <div>
                        <div className={styles.sectionTitle}>Sources</div>
                        {msg.sources.map((s, idx) => (
                          <div key={idx} className={styles.sourceItem}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                      <div>
                        <div className={styles.relatedQuestionsTitle}>Related Questions</div>
                        <div className={styles.relatedQuestionsFlex}>
                          {msg.relatedQuestions.map((q, idx) => (
                            <div key={idx} className={styles.relatedQuestionBtn} onClick={() => handleSend(q)}>
                              {q}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.actionBtns}>
                      <button className={`btn btn-secondary ${styles.actionBtn}`} onClick={() => navigator.clipboard.writeText(msg.text)}>
                        📋 Copy
                      </button>
                      <button className={`btn btn-secondary ${styles.actionBtn}`} onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(msg.text);
                          window.speechSynthesis.speak(utterance);
                      }}>
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className={styles.userAvatar}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              )}

            </div>
          ))
        )}

        {messages.length > 0 && !hasData && (
          <div className={styles.warningBox} style={{ marginTop: '2rem' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.warningIcon}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <h3 className={styles.warningTitle}>Warning: No Documents Uploaded</h3>
            <p className={styles.warningText}>Your company data is not added yet. Please upload documents to start querying.</p>
            <button onClick={onAdminClick} className="btn btn-primary" style={{ width: '100%' }}>Upload Document</button>
          </div>
        )}

        {loading && <ChatLoadingSteps />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
