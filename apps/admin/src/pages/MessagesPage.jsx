import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader.jsx';
import { api } from '../lib/api';

export default function MessagesPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await api.get('/admin/messages');
      return response.data.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => api.patch(`/admin/messages/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  const deleteMessage = useMutation({
    mutationFn: async (id) => api.delete(`/admin/messages/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Review incoming inquiries from the public portfolio contact form, mark status, and clean up the inbox." />
      <div className="space-y-4">
        {(data || []).map((message) => (
          <article key={message._id} className="admin-card p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold text-white">{message.subject || 'New portfolio inquiry'}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs ${message.status === 'new' ? 'bg-amber-400/15 text-amber-200' : message.status === 'read' ? 'bg-teal-400/15 text-teal-200' : 'bg-slate-400/15 text-slate-300'}`}>{message.status}</span>
                </div>
                <div className="mt-3 text-sm text-slate-400">{message.name} · {message.email}</div>
                <p className="mt-4 max-w-3xl leading-7 text-slate-300">{message.message}</p>
                <div className="mt-4 text-xs text-slate-500">Received {new Date(message.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={async () => { await updateStatus.mutateAsync({ id: message._id, status: 'read' }); toast.success('Marked as read'); }} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200">Mark read</button>
                <button onClick={async () => { await updateStatus.mutateAsync({ id: message._id, status: 'archived' }); toast.success('Archived'); }} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200">Archive</button>
                <button onClick={async () => { if (!window.confirm('Delete this message?')) return; await deleteMessage.mutateAsync(message._id); toast.success('Deleted'); }} className="rounded-2xl border border-rose-400/20 px-4 py-2 text-sm text-rose-200">Delete</button>
              </div>
            </div>
          </article>
        ))}
        {data?.length === 0 ? <div className="admin-card p-10 text-center text-slate-500">No messages yet.</div> : null}
      </div>
    </div>
  );
}
