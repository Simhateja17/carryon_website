import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DashboardContent from '@/components/DashboardContent';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#F7F9FB', display: 'flex', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />
        <DashboardContent />
      </div>
    </div>
  );
}
