import { Metadata } from 'next';
import AdminDashboard from '@/components/sections/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard — ShiftEase by Sheetal',
  description: 'Admin dashboard for managing vendor approvals and leads.',
};

export default function AdminPage() {
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="heading-xl font-display text-navy mb-2">Admin Dashboard</h1>
        <p className="text-body text-slate">Manage vendor applications, review leads, and monitor platform activity.</p>
      </div>
      <AdminDashboard />
    </div>
  );
}