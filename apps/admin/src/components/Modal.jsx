export default function Modal({ title, open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="admin-card max-h-[90vh] w-full max-w-3xl overflow-auto p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
