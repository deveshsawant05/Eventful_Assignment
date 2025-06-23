import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';

export const metadata = {
  title: 'Manager Dashboard - Artistly',
  description: 'Manage artist applications and bookings. Review submissions and approve new artists for the platform.',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <ManagerDashboard />
    </div>
  );
}