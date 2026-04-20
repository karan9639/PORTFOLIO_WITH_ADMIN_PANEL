import CrudResourcePage from '../components/CrudResourcePage.jsx';
import { useCollectionResource } from '../hooks/useResource.js';

const fields = [
  { name: 'label', label: 'Label', required: true },
  { name: 'icon', label: 'Icon name' },
  { name: 'url', label: 'URL', required: true },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
];

export default function SocialLinksPage() {
  const resource = useCollectionResource('social-links', 'social-links');

  return (
    <CrudResourcePage
      title="Social links"
      description="Manage social proof and direct profile links used across the portfolio layout."
      items={resource.data}
      fields={fields}
      columns={[
        { key: 'label', label: 'Label' },
        { key: 'icon', label: 'Icon' },
        { key: 'url', label: 'URL' },
      ]}
      onCreate={resource.createItem}
      onUpdate={(id, payload) => resource.updateItem.mutateAsync({ id, payload })}
      onDelete={resource.deleteItem.mutateAsync}
      loading={resource.isLoading}
    />
  );
}
