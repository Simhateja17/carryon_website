'use client';

import { useCallback, useEffect, useState } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  avatar?: string;
  initials?: string;
  duration?: number;
}

interface NotificationToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(notification.id), 300);
  }, [notification.id, onClose]);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    
    // Auto close
    const duration = notification.duration || 5000;
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(closeTimer);
    };
  }, [handleClose, notification.duration]);

  const borderColors = {
    info: '#2F80ED',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  const bgColors = {
    info: '#F0F7FF',
    success: '#ECFDF5',
    warning: '#FFFBEB',
    error: '#FEF2F2',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        background: bgColors[notification.type],
        borderRadius: '12px',
        borderLeft: `4px solid ${borderColors[notification.type]}`,
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        minWidth: '360px',
        maxWidth: '480px',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Avatar or Icon */}
      {notification.initials ? (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: '#B7DAF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: inter,
              fontSize: '14px',
              fontWeight: 600,
              color: '#2F80ED',
            }}
          >
            {notification.initials}
          </span>
        </div>
      ) : (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: borderColors[notification.type],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {notification.type === 'info' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M10 9v5M10 6.5v.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {notification.type === 'success' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M6 10l2.5 2.5L14 7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {notification.type === 'warning' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l8 14H2L10 2z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 8v4M10 14v.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {notification.type === 'error' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M7 7l6 6M13 7l-6 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {notification.title && (
          <div
            style={{
              fontFamily: manrope,
              fontSize: '14px',
              fontWeight: 700,
              color: '#1E293B',
              marginBottom: '4px',
            }}
          >
            {notification.title}
          </div>
        )}
        <div
          style={{
            fontFamily: inter,
            fontSize: '13px',
            fontWeight: 500,
            color: '#475569',
            lineHeight: '1.5',
          }}
        >
          {notification.message}
        </div>
      </div>

      {/* Close Button */}
      <button
        suppressHydrationWarning
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '-4px',
          marginRight: '-4px',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

interface NotificationContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none',
      }}
    >
      {notifications.map((notification) => (
        <div key={notification.id} style={{ pointerEvents: 'auto' }}>
          <NotificationToast notification={notification} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };
}

// Convenience methods
export function createNotificationMethods(addNotification: (n: Omit<Notification, 'id'>) => string) {
  return {
    info: (message: string, title?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'info', message, title, ...options }),
    success: (message: string, title?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'success', message, title, ...options }),
    warning: (message: string, title?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'warning', message, title, ...options }),
    error: (message: string, title?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'error', message, title, ...options }),
  };
}

export type { Notification };
