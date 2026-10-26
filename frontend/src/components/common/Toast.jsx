import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        background: '#FFFFFF',
        color: '#1C1E1B',
        borderRadius: '12px',
        padding: '14px 20px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
        border: '1px solid #EAE5D9',
        borderLeft: isSuccess ? '5px solid #22C55E' : '5px solid var(--accent-saffron)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '400px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={20} color="#22C55E" />
      ) : (
        <Info size={20} color="var(--accent-saffron)" />
      )}
      <span style={{ fontSize: '14px', fontWeight: 500 }}>
        {toast.message}
      </span>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
