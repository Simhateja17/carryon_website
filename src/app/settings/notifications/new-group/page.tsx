'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const MEMBERS = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Lead Dispatcher',
    status: 'ACTIVE',
    avatar: 'AR',
    color: '#2F80ED',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Operations Manager',
    status: 'AWAY',
    avatar: 'SC',
    color: '#64748B',
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    role: 'Senior Driver',
    status: 'ACTIVE',
    avatar: 'MT',
    color: '#2F80ED',
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    role: 'Route Coordinator',
    status: 'ACTIVE',
    avatar: 'ER',
    color: '#2F80ED',
  },
];

const RULES = [
  { id: 1, label: 'Critical Delays', desc: 'Alert when shipment is >2 hrs behind' },
  { id: 2, label: 'Route Divergence', desc: 'Alert when driver deviates from route' },
  { id: 3, label: 'Cargo Temperature', desc: 'Alert when temp exceeds threshold' },
  { id: 4, label: 'Driver Rest Hours', desc: 'Alert on HOS compliance issues' },
];

export default function NewGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('West Coast Dispatchers');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [checkedMembers, setCheckedMembers] = useState<Set<number>>(new Set([1, 3]));
  const [checkedRules, setCheckedRules] = useState<Set<number>>(new Set([1, 2]));

  const toggleMember = (id: number) => {
    setCheckedMembers(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleRule = (id: number) => {
    setCheckedRules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredMembers = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = checkedMembers.size;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar />
        <main style={{ padding: '32px 40px 60px' }}>

          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '36px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
                Create Notification Group
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px', margin: '6px 0 0 0' }}>
                Define a reusable group of recipients for targeted alert delivery
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                suppressHydrationWarning
                onClick={() => router.push('/settings/notifications')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: '#A6D2F3',
                  border: 'none',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#2F80ED',
                  cursor: 'pointer',
                }}
              >
                Discard Draft
              </button>
              <button
                suppressHydrationWarning
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: '#2F80ED',
                  border: 'none',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFF',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                }}
              >
                SAVE GROUP
              </button>
            </div>
          </div>

          {/* Top Row: General Info + Notification Reach */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', marginBottom: '24px' }}>

            {/* General Information */}
            <div style={{
              background: '#FFF',
              borderRadius: '12px',
              padding: '28px',
              boxShadow: '0px 1px 3px rgba(0,0,0,0.07)',
            }}>
              <h2 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 20px 0' }}>
                General Information
              </h2>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Group Name
                </label>
                <input
                  suppressHydrationWarning
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="e.g. West Coast Dispatchers"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#A6D2F3',
                    border: 'none',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    color: '#1E3A5F',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Description
                </label>
                <textarea
                  suppressHydrationWarning
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the purpose and scope of this notification group..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#A6D2F3',
                    border: 'none',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    color: '#1E3A5F',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                    lineHeight: '1.5',
                  }}
                />
              </div>
            </div>

            {/* Notification Reach */}
            <div style={{
              background: '#2F80ED',
              borderRadius: '12px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <h2 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#FFF', margin: 0 }}>
                Notification Reach
              </h2>
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '56px', fontWeight: 800, color: '#FFF', lineHeight: 1 }}>
                  245
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: '8px 0 0 0', lineHeight: 1.5 }}>
                  Potential recipients who will receive alerts when this group is triggered
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginBottom: '4px' }}>
                    Active Members
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }}>{activeCount}</div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginBottom: '4px' }}>
                    Priority Level
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }}>High</div>
                </div>
              </div>
              <div style={{
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '20px',
                padding: '6px 14px',
                alignSelf: 'flex-start',
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1.2" />
                  <path d="M4 6l1.5 1.5L8 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFF' }}>Verified Corporate Group</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Add Members + Group Logic Rules */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>

            {/* Add Group Members */}
            <div style={{
              background: '#FFF',
              borderRadius: '12px',
              padding: '28px',
              boxShadow: '0px 1px 3px rgba(0,0,0,0.07)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Add Group Members
                </h2>
                <div style={{ position: 'relative' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <circle cx="7" cy="7" r="4.5" stroke="#94A3B8" strokeWidth="1.3" />
                    <path d="M10.5 10.5l2 2" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <input
                    suppressHydrationWarning
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Filter members..."
                    style={{
                      paddingLeft: '32px',
                      paddingRight: '12px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      color: '#374151',
                      outline: 'none',
                      width: '180px',
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {filteredMembers.map(member => {
                  const checked = checkedMembers.has(member.id);
                  return (
                    <div
                      key={member.id}
                      onClick={() => toggleMember(member.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        background: checked ? 'rgba(47,128,237,0.05)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                    >
                      {/* Checkbox */}
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: checked ? 'none' : '2px solid #CBD5E1',
                        background: checked ? '#2F80ED' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {/* Avatar */}
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: member.status === 'ACTIVE' ? '#DBEAFE' : '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: member.status === 'ACTIVE' ? '#2F80ED' : '#64748B',
                        flexShrink: 0,
                      }}>
                        {member.avatar}
                      </div>
                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{member.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{member.role}</div>
                      </div>
                      {/* Status badge */}
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: member.status === 'ACTIVE' ? '#DBEAFE' : '#F1F5F9',
                        color: member.status === 'ACTIVE' ? '#2F80ED' : '#64748B',
                        letterSpacing: '0.3px',
                      }}>
                        {member.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Group Logic Rules */}
            <div style={{
              background: 'rgba(166,210,243,0.2)',
              borderRadius: '12px',
              padding: '28px',
            }}>
              <h2 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#2F80ED', margin: '0 0 8px 0' }}>
                Group Logic Rules
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                Select the alert types this group should receive
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {RULES.map(rule => {
                  const checked = checkedRules.has(rule.id);
                  return (
                    <div
                      key={rule.id}
                      onClick={() => toggleRule(rule.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        background: checked ? 'rgba(47,128,237,0.08)' : '#FFF',
                        border: `1px solid ${checked ? '#A6D2F3' : '#E2E8F0'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: checked ? 'none' : '2px solid #CBD5E1',
                        background: checked ? '#2F80ED' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{rule.label}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{rule.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Add Custom Trigger */}
              <button
                suppressHydrationWarning
                style={{
                  width: '100%',
                  marginTop: '14px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1.5px dashed #A6D2F3',
                  background: 'transparent',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#2F80ED',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#2F80ED" strokeWidth="1.3" />
                  <path d="M7 4.5v5M4.5 7h5" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Add Custom Trigger
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
