import CrudResourcePage from '../components/CrudResourcePage.jsx';
import { useCollectionResource } from '../hooks/useResource.js';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'slug', label: 'Slug' },
  { name: 'year', label: 'Year' },
  { name: 'role', label: 'Role' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, span: 2 },
  { name: 'description', label: 'Description', type: 'textarea', required: true, span: 2 },
  { name: 'imageUrl', label: 'Project image', type: 'file-url', accept: 'image/*', span: 2 },
  { name: 'technologies', label: 'Technologies', type: 'csv', span: 2 },
  { name: 'highlights', label: 'Highlights', type: 'csv', span: 2, help: 'Comma-separated bullet points' },
  { name: 'githubUrl', label: 'GitHub URL' },
  { name: 'liveUrl', label: 'Live URL' },
  { name: 'featured', label: 'Featured project', type: 'checkbox' },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
];

export default function ProjectsPage() {
  const resource = useCollectionResource('projects', 'projects');

  return (
    <CrudResourcePage
      title="Projects"
      description="Manage the portfolio case studies shown publicly on the website and detailed project pages."
      items={resource.data}
      fields={fields}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'year', label: 'Year' },
        { key: 'featured', label: 'Featured' },
        { key: 'sortOrder', label: 'Sort' },
      ]}
      renderCell={(item, key) => {
        if (key === 'featured') return item.featured ? 'Yes' : 'No';
        return item[key] || '—';
      }}
      onCreate={resource.createItem}
      onUpdate={(id, payload) => resource.updateItem.mutateAsync({ id, payload })}
      onDelete={resource.deleteItem.mutateAsync}
      loading={resource.isLoading}
    />
  );
}
