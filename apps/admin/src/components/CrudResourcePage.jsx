import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from './PageHeader.jsx';
import Modal from './Modal.jsx';
import CrudModalForm from './CrudModalForm.jsx';

export default function CrudResourcePage({
  title,
  description,
  items,
  fields,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  loading,
  renderCell,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const close = () => {
    setOpen(false);
    setSelected(null);
  };

  const runAction = async (action, ...args) => {
    if (typeof action === 'function') return action(...args);
    if (action?.mutateAsync) return action.mutateAsync(...args);
    return null;
  };

  const handleSave = async (payload) => {
    try {
      if (selected?._id) await runAction(onUpdate, selected._id, payload);
      else await runAction(onCreate, payload);
      toast.success(selected?._id ? 'Updated successfully' : 'Created successfully');
      close();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to save');
    }
  };

  const rows = useMemo(() => items || [], [items]);

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={<button onClick={() => setOpen(true)} className="rounded-2xl bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950">Add new</button>}
      />

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-slate-400">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-5 py-4 font-medium">{column.label}</th>
                ))}
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item._id} className="border-b border-white/5 text-slate-200 last:border-0">
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4 align-top">
                      {renderCell ? renderCell(item, column.key) : item[column.key] || '—'}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => { setSelected(item); setOpen(true); }} className="text-teal-200">Edit</button>
                      <button
                        onClick={async () => {
                          if (!window.confirm('Delete this item?')) return;
                          try {
                            await runAction(onDelete, item._id);
                            toast.success('Deleted successfully');
                          } catch (error) {
                            toast.error(error?.response?.data?.message || 'Unable to delete');
                          }
                        }}
                        className="text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-slate-500">No records yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={close} title={selected ? `Edit ${title}` : `Add ${title}`}>
        <CrudModalForm
          fields={fields}
          initialData={selected}
          onSubmit={handleSave}
          onCancel={close}
          loading={Boolean(onCreate?.isPending || onUpdate?.isPending)}
          submitLabel={selected ? 'Update item' : 'Create item'}
        />
      </Modal>
    </>
  );
}
