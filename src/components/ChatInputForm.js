import React, { useState, useEffect } from 'react';
import ChatDocumentFilter from './ChatDocumentFilter';
import styles from '../styles/Chat.module.css';

export default function ChatInputForm({ inputRef, handleSend, input, setInput, loading, hasData, availableDocs, selectedDocs, setSelectedDocs }) {
  const [showFilter, setShowFilter] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      // The instance stops automatically on end, but we can't reliably keep a ref to it across renders without useRef
      // A simple implementation just toggles the state, and we'll start a new recognition if turning on
      setIsListening(false);
      window.recognitionInstance?.stop();
    } else {
      const recognition = new SpeechRecognition();
      window.recognitionInstance = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    }
  };

  return (
    <div className={styles.inputFormWrapper}>
      <div className={styles.inputFormInner}>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className={`btn btn-secondary ${styles.filterBtn}`}
            onClick={() => setShowFilter(!showFilter)}
            disabled={!hasData || loading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span className={styles.filterText}>Filter</span>
          </button>

          <ChatDocumentFilter
            availableDocs={availableDocs}
            selectedDocs={selectedDocs}
            setSelectedDocs={setSelectedDocs}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className={styles.formFlex}>
          <input
            ref={inputRef}
            className={`input ${styles.inputField}`}
            placeholder={selectedDocs.length === 0 ? "Select a document to ask questions..." : "Ask a question..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading || !hasData || selectedDocs.length === 0}
          />
          <div className={styles.inputActions}>
            <button
              type="button"
              onClick={toggleListening}
              disabled={!hasData || loading || selectedDocs.length === 0}
              className={`btn ${isListening ? styles.micListening : 'btn-secondary'} ${styles.micBtn}`}
              title="Ask by voice"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
            <button
              type="submit"
              disabled={!input.trim() || loading || !hasData || selectedDocs.length === 0}
              className={`btn btn-primary ${styles.sendBtn}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
