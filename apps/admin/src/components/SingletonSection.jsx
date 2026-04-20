import toast from 'react-hot-toast';
import CrudModalForm from './CrudModalForm.jsx';

export default function SingletonSection({ title, description, fields, resource }) {
  const handleSubmit = async (payload) => {
    try {
      await resource.save.mutateAsync(payload);
      toast.success(`${title} updated`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to save changes');
    }
  };

  return (
    <section className="admin-card p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <CrudModalForm
        fields={fields}
        initialData={resource.data}
        onSubmit={handleSubmit}
        onCancel={undefined}
        loading={resource.save.isPending}
        submitLabel="Save changes"
      />
    </section>
  );
}
