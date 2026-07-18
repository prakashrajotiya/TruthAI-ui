import React from 'react';

export default function ChatDocumentFilter({ availableDocs, selectedDocs, setSelectedDocs, showFilter, setShowFilter }) {
  if (!showFilter || availableDocs.length === 0) return null;

  const handleToggle = (doc) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter(d => d !== doc));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  return (
    <div className="animate-fade-in" style={{ 
      position: 'absolute', 
      bottom: '100%', 
      right: '1.5rem', 
      marginBottom: '0.5rem',
      background: 'var(--surface-color)', 
      border: '1px solid var(--border-color)', 
      borderRadius: 'var(--radius-md)', 
      boxShadow: 'var(--shadow-md)',
      padding: '1rem',
      width: '250px',
      zIndex: 10
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        Search Documents
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
        {availableDocs.map(doc => (
          <label key={doc} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
            <input 
              type="checkbox" 
              checked={selectedDocs.includes(doc)} 
              onChange={() => handleToggle(doc)}
              style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            {doc}
          </label>
        ))}
      </div>
    </div>
  );
}
