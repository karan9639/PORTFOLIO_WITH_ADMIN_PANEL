import CrudResourcePage from '../components/CrudResourcePage.jsx';
import { useCollectionResource } from '../hooks/useResource.js';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'icon', label: 'Icon name', help: 'Examples: sparkles, server, layout-dashboard' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, span: 2 },
  { name: 'deliverables', label: 'Deliverables', type: 'csv', span: 2, help: 'Comma-separated outcomes shown as chips' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
];

export default function ServicesPage() {
  const resource = useCollectionResource('services', 'services');

  return (
    <CrudResourcePage
      title="Services"
      description="Refine the homepage positioning, value proposition, and service cards."
      items={resource.data}
      fields={fields}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'icon', label: 'Icon' },
        { key: 'sortOrder', label: 'Sort' },
      ]}
      onCreate={resource.createItem}
      onUpdate={(id, payload) => resource.updateItem.mutateAsync({ id, payload })}
      onDelete={resource.deleteItem.mutateAsync}
      loading={resource.isLoading}
    />
  );
}
