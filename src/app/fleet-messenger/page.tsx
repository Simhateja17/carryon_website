'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { NotificationContainer, useNotifications, createNotificationMethods } from '@/components/Notifications';

const drivers = [
  {
    id: 1,
    name: 'Marcus Chen',
    route: 'Route: CX-402 • On Trip',
    preview: 'Cleared customs. Heading to wareho…',
    time: '2m ago',
    active: true,
    online: true,
    initials: 'MC',
  },
  {
    id: 2,
    name: 'Elena Rodrigues',
    route: 'Offline',
    preview: 'Vehicle maintenance scheduled for to…',
    time: '1h ago',
    active: false,
    online: true,
    initials: 'ER',
  },
  {
    id: 3,
    name: 'David Vance',
    route: 'Route: NY-199 • On Trip',
    preview: 'Payload confirmed. Documentation u…',
    time: '3h ago',
    active: false,
    online: true,
    initials: 'DV',
  },
  {
    id: 4,
    name: 'Samual Oak',
    route: 'Route: SF-882 • Delayed',
    preview: 'Heavy traffic on I-80. Revised ETA: 16:…',
    time: '5h ago',
    active: false,
    online: true,
    initials: 'SO',
  },
];

const messages = [
  {
    id: 1,
    type: 'system',
    text: 'System alert: Arrived at Port Newark Terminal. Waiting for container release. Documents are ready on the dashboard.',
    time: '10:14 AM',
  },
  {
    id: 2,
    type: 'outgoing',
    text: 'Copy that, Marcus. Release authorization was sent to the port authority at 09:45. Let us know if there are any gate delays.',
    time: '10:18 AM • Read',
  },
  {
    id: 3,
    type: 'incoming',
    text: 'Cleared customs. Heading to warehouse B now.',
    time: '11:02 AM',
    attachment: { name: 'Gate_Pass_402.pdf', size: '1.2 MB' },
  },
];

const filterButtons = ['All', 'On Trip', 'Alerts'];

export default function FleetMessengerPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDriverId, setActiveDriverId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const { notifications, addNotification, removeNotification } = useNotifications();
  const notify = createNotificationMethods(addNotification);

  const activeDriver = drivers.find((d) => d.id === activeDriverId) ?? drivers[0];

  const handleDriverSelect = (driverId: number) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (driver) {
      setActiveDriverId(driverId);
      notify.info(
        `You can now track the delivery in real-time on the Live Map.`,
        `The driver has been assigned to the order.`,
        { initials: driver.initials, duration: 6000 }
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', fontFamily: 'Inter, sans-serif', background: '#F7F9FB' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar />

        {/* Content after sidebar */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Chat Sidebar — driver list */}
          <div style={{ width: '320px', flexShrink: 0, background: '#F2F4F6', display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(194,198,214,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '18px', fontWeight: 700, color: '#191C1E', lineHeight: '28px' }}>
                Messages
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {filterButtons.map((f) => (
                  <button
                    suppressHydrationWarning
                    key={f}
                    type="button"
                    onClick={() => setActiveFilter(f)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: activeFilter === f ? '#0058BE' : '#E6E8EA',
                      color: activeFilter === f ? '#fff' : '#424754',
                      lineHeight: '16px',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Driver list */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {drivers.map((driver) => (
                <button
                  suppressHydrationWarning
                  key={driver.id}
                  type="button"
                  onClick={() => handleDriverSelect(driver.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    padding: '16px',
                    paddingLeft: driver.id === activeDriverId ? '20px' : '16px',
                    borderLeft: driver.id === activeDriverId ? '4px solid #2F80ED' : '4px solid transparent',
                    background: driver.id === activeDriverId ? '#fff' : 'transparent',
                    border: 'none',
                    borderLeftWidth: '4px',
                    borderLeftStyle: 'solid',
                    borderLeftColor: driver.id === activeDriverId ? '#2F80ED' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '8px',
                      background: '#B7DAF5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      filter: driver.id !== activeDriverId && driver.route === 'Offline' ? 'grayscale(100%)' : 'none',
                    }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2F80ED' }}>{driver.initials}</span>
                    </div>
                    <div style={{
                      position: 'absolute', bottom: '-4px', right: '-4px',
                      width: '16px', height: '16px', borderRadius: '9999px',
                      background: '#2F80ED', border: '2px solid #F2F4F6',
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '14px', fontWeight: 700, color: '#000', lineHeight: '20px' }}>
                        {driver.name}
                      </span>
                      <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#2F80ED', lineHeight: '16.5px', flexShrink: 0, marginLeft: '8px' }}>
                        {driver.time}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2F80ED', lineHeight: '16px', marginTop: '2px' }}>
                      {driver.route}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#000', lineHeight: '16px', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {driver.preview}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Chat Window */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: '#F7F9FB', overflow: 'hidden' }}>

            {/* Chat Header */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              borderBottom: '1px solid rgba(194,198,214,0.1)',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#B7DAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2F80ED' }}>{activeDriver.initials}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '16px', fontWeight: 700, color: '#191C1E', lineHeight: '24px' }}>
                    {activeDriver.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#006947' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#424754', lineHeight: '16px' }}>
                      Active • {activeDriver.route.replace('Route: ', '')}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {/* Phone icon */}
                <button suppressHydrationWarning style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.5 2H4a2 2 0 0 0-2 2v.5c0 6.351 5.149 11.5 11.5 11.5H14a2 2 0 0 0 2-2v-2.5l-3.5-1-1.5 1.5c-1.5-.5-3.5-2.5-4-4L8.5 6 7.5 2.5" stroke="#424754" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {/* Video icon */}
                <button suppressHydrationWarning style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><rect x="1" y="1" width="12" height="14" rx="2" stroke="#424754" strokeWidth="1.3" /><path d="M13 5l6-3v12l-6-3V5Z" stroke="#424754" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                </button>
                {/* Info icon */}
                <button suppressHydrationWarning style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#424754" strokeWidth="1.3" /><path d="M10 9v5M10 6.5v.5" stroke="#424754" strokeWidth="1.4" strokeLinecap="round" /></svg>
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* Date divider */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ background: '#ECEEF0', borderRadius: '9999px', padding: '4px 16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#424754', letterSpacing: '1.1px', textTransform: 'uppercase', lineHeight: '16.5px' }}>
                    Today, Oct 24
                  </span>
                </div>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: msg.type === 'outgoing' ? 'flex-end' : 'flex-start' }}>
                  {msg.type !== 'outgoing' && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', maxWidth: '492px' }}>
                      {/* Avatar */}
                      <div style={{ width: '32px', height: '32px', borderRadius: '9999px', background: '#B7DAF5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#2F80ED' }}>{activeDriver.initials}</span>
                      </div>
                      <div>
                        <div style={{
                          background: '#fff',
                          borderRadius: '12px 12px 12px 0',
                          padding: '14px 16px',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
                          maxWidth: '415px',
                        }}>
                          <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '14px', color: '#191C1E', lineHeight: '22.75px' }}>{msg.text}</p>
                          {msg.attachment && (
                            <div style={{ marginTop: '8px', background: '#fff', borderRadius: '8px', padding: '8px', border: '1px solid #E2E8F0', display: 'flex', gap: '12px', alignItems: 'center', width: '192px', boxSizing: 'border-box' }}>
                              <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><rect x="1" y="1" width="14" height="18" rx="2" stroke="#424754" strokeWidth="1.3" /><path d="M4 6h8M4 10h8M4 14h4" stroke="#424754" strokeWidth="1.3" strokeLinecap="round" /></svg>
                              <div>
                                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#191C1E', lineHeight: '15px' }}>{msg.attachment.name}</div>
                                <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#94A3B8', lineHeight: '13.5px' }}>{msg.attachment.size}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', lineHeight: '16.5px', marginTop: '4px', paddingLeft: '4px' }}>{msg.time}</div>
                      </div>
                    </div>
                  )}
                  {msg.type === 'outgoing' && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', maxWidth: '492px' }}>
                      <div>
                        <div style={{
                          background: '#2F80ED',
                          borderRadius: '12px 12px 0 12px',
                          padding: '14px 16px',
                          boxShadow: '0 4px 6px -1px rgba(0,88,190,0.1), 0 2px 4px -2px rgba(0,88,190,0.1)',
                          maxWidth: '415px',
                        }}>
                          <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '14px', color: '#fff', lineHeight: '22.75px' }}>{msg.text}</p>
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', lineHeight: '16.5px', marginTop: '4px', paddingRight: '4px', textAlign: 'right' }}>{msg.time}</div>
                      </div>
                      <div style={{ width: '32px', height: '32px', borderRadius: '9999px', background: '#2170E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#fff' }}>HQ</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div style={{ background: '#fff', padding: '16px 24px', borderTop: '1px solid #F2F4F6' }}>
              <div style={{ background: '#F2F4F6', borderRadius: '12px', padding: '8px', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                {/* Attachment button */}
                <button suppressHydrationWarning style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17 10.5l-6.5 6.5a4.5 4.5 0 1 1-6.364-6.364l7.07-7.07a3 3 0 0 1 4.243 4.242l-7.07 7.07a1.5 1.5 0 0 1-2.122-2.12L13 6" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {/* Text area */}
                <div style={{ flex: 1, padding: '8px 12px' }}>
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a professional message..."
                    style={{
                      width: '100%', background: 'transparent', border: 'none', outline: 'none',
                      fontFamily: 'Inter', fontSize: '14px', color: '#6B7280', lineHeight: '20px',
                    }}
                  />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingBottom: '4px', paddingRight: '4px', flexShrink: 0 }}>
                  <button suppressHydrationWarning style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#6B7280" strokeWidth="1.3" /><path d="M7 11.5c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5M8 8.5v.1M12 8.5v.1" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  </button>
                  <button suppressHydrationWarning style={{ width: '36px', height: '36px', background: '#2F80ED', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0,88,190,0.2), 0 4px 6px -4px rgba(0,88,190,0.2)' }}>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M1 11L13 6 1 1v4l8.5 1L1 7v4Z" fill="white" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Driver Profile Card Overlay */}
            <div style={{
              position: 'absolute',
              top: '96px',
              right: '24px',
              width: '288px',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
              padding: '21px',
            }}>
              {/* Avatar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: '#B7DAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.05)', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 600, color: '#2F80ED' }}>{activeDriver.initials}</span>
                </div>
                <div style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '16px', fontWeight: 700, color: '#191C1E', lineHeight: '24px' }}>{activeDriver.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#424754', lineHeight: '16px', textAlign: 'center', marginTop: '2px' }}>Senior Logistics Officer • 4.98 ★</div>
              </div>

              {/* Active assignment */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1.1px', textTransform: 'uppercase', lineHeight: '16.5px' }}>Active Assignment</div>
                <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#191C1E', lineHeight: '15px' }}>Route CX-402</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#64748B', lineHeight: '13.5px' }}>Newark → Manhattan</div>
                  </div>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H3M8 2v5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#94A3B8', lineHeight: '16.5px' }}>Total Hours</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E', lineHeight: '20px' }}>1,240</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#94A3B8', lineHeight: '16.5px' }}>Deliveries</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E', lineHeight: '20px' }}>842</div>
                </div>
              </div>

              {/* View Full Dossier button */}
              <div style={{ borderTop: '1px solid rgba(226,232,240,0.5)', paddingTop: '9px' }}>
                <button suppressHydrationWarning style={{
                  width: '100%', background: '#E6E8EA', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  padding: '8px', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#424754', letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: '15px',
                }}>
                  VIEW FULL DOSSIER
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Notifications */}
      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </div>
  );
}
