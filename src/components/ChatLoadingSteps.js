import React, { useState, useEffect } from 'react';

export default function ChatLoadingSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate the steps timing. The actual request will unmount this component when it finishes.
    const timers = [
      setTimeout(() => setCurrentStep(1), 500),
      setTimeout(() => setCurrentStep(2), 1500),
      setTimeout(() => setCurrentStep(3), 2500)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    "Reading Question",
    "Searching Database",
    "Finding Relevant Chunks",
    "Generating Answer"
  ];

  return (
    <div className="flex justify-start animate-fade-in">
      <div style={{
        padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--bot-msg-bg)',
        border: '1px solid var(--border-color)', borderBottomLeftRadius: '0.25rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '250px'
      }}>
        {steps.map((text, idx) => {
          const isCompleted = currentStep > idx;
          const isActive = currentStep === idx;
          const isPending = currentStep < idx;

          if (isPending && idx > currentStep + 1) return null; // hide far future steps to build suspense

          return (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: isPending ? 0.4 : 1,
              transition: 'opacity 0.3s ease'
            }}>
              {isCompleted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : isActive ? (
                <div style={{ width: '18px', height: '18px', border: '2px solid var(--border-color)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              ) : (
                <div style={{ width: '18px', height: '18px', border: '2px solid var(--border-color)', borderRadius: '50%' }}></div>
              )}
              <span style={{ 
                fontSize: '0.95rem', 
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? '500' : 'normal'
              }}>
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
