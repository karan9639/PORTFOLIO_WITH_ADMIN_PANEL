import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import CrudResourcePage from '../components/CrudResourcePage.jsx';
import { useCollectionResource } from '../hooks/useResource.js';

const categoryFields = [
  { name: 'name', label: 'Category name', required: true },
  { name: 'description', label: 'Description', type: 'textarea', span: 2 },
  { name: 'sortOrder', label: 'Sort order', type: 'number' },
];

export default function SkillsPage() {
  const [tab, setTab] = useState('categories');
  const categories = useCollectionResource('skill-categories', 'skill-categories');
  const skills = useCollectionResource('skills', 'skills');

  const skillFields = [
    { name: 'name', label: 'Skill name', required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: (categories.data || []).map((item) => ({ value: item._id, label: item.name })),
    },
    { name: 'icon', label: 'Icon name' },
    { name: 'level', label: 'Level', type: 'number', required: true },
    { name: 'sortOrder', label: 'Sort order', type: 'number' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Skills" description="Manage both skill categories and individual stack items with proficiency values." />
      <div className="flex gap-3">
        {['categories', 'skills'].map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-2xl px-4 py-2 text-sm ${tab === item ? 'bg-teal-400 text-slate-950' : 'border border-white/10 text-slate-300'}`}>
            {item === 'categories' ? 'Skill categories' : 'Skills'}
          </button>
        ))}
      </div>

      {tab === 'categories' ? (
        <CrudResourcePage
          title="Skill categories"
          description="Create groups such as Frontend, Backend, and Tools."
          items={categories.data}
          fields={categoryFields}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description' },
            { key: 'sortOrder', label: 'Sort' },
          ]}
          onCreate={categories.createItem}
          onUpdate={(id, payload) => categories.updateItem.mutateAsync({ id, payload })}
          onDelete={categories.deleteItem.mutateAsync}
          loading={categories.isLoading}
        />
      ) : (
        <CrudResourcePage
          title="Skills"
          description="Add technologies and assign them to categories with a proficiency level."
          items={skills.data}
          fields={skillFields}
          columns={[
            { key: 'name', label: 'Skill' },
            { key: 'category', label: 'Category' },
            { key: 'level', label: 'Level' },
          ]}
          renderCell={(item, key) => {
            if (key === 'category') return item.category?.name || '—';
            return item[key] || '—';
          }}
          onCreate={skills.createItem}
          onUpdate={(id, payload) => skills.updateItem.mutateAsync({ id, payload })}
          onDelete={skills.deleteItem.mutateAsync}
          loading={skills.isLoading}
        />
      )}
    </div>
  );
}
