'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function DriversLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        background: '#F8FAFC',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
}
