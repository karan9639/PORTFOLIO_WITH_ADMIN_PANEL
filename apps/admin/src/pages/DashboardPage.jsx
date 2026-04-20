import { useQuery } from '@tanstack/react-query';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import { api } from '../lib/api';

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data.data;
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard overview" description="Track content health, portfolio inventory, and unread inquiries from a single high-level view." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Projects" value={data?.projects || 0} helper="Visible across the public portfolio" />
        <StatCard label="Skills" value={data?.skills || 0} helper="Stack items grouped by category" />
        <StatCard label="Experience entries" value={data?.experiences || 0} helper="Career timeline coverage" />
        <StatCard label="Services" value={data?.services || 0} helper="Positioning and offer statements" />
        <StatCard label="Total messages" value={data?.messages || 0} helper="All portfolio inquiries" />
        <StatCard label="Unread messages" value={data?.unreadMessages || 0} helper="Requires admin attention" />
      </div>
    </div>
  );
}
