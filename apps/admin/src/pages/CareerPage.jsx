import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import CrudResourcePage from '../components/CrudResourcePage.jsx';
import { useCollectionResource } from '../hooks/useResource.js';

const tabs = [
  { key: 'experiences', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'achievements', label: 'Achievements' },
];

export default function CareerPage() {
  const [tab, setTab] = useState('experiences');
  const experiences = useCollectionResource('experiences', 'experiences');
  const education = useCollectionResource('education', 'education');
  const certifications = useCollectionResource('certifications', 'certifications');
  const achievements = useCollectionResource('achievements', 'achievements');

  const config = {
    experiences: {
      resource: experiences,
      title: 'Experience',
      description: 'Career timeline entries shown in the public portfolio.',
      fields: [
        { name: 'company', label: 'Company', required: true },
        { name: 'role', label: 'Role', required: true },
        { name: 'location', label: 'Location' },
        { name: 'period', label: 'Period', required: true },
        { name: 'employmentType', label: 'Employment type' },
        { name: 'stack', label: 'Stack used', type: 'csv', span: 2 },
        { name: 'description', label: 'Description', type: 'textarea', required: true, span: 2 },
        { name: 'highlights', label: 'Highlights', type: 'csv', span: 2 },
        { name: 'current', label: 'Current role', type: 'checkbox' },
        { name: 'sortOrder', label: 'Sort order', type: 'number' },
      ],
      columns: [
        { key: 'company', label: 'Company' },
        { key: 'role', label: 'Role' },
        { key: 'employmentType', label: 'Type' },
        { key: 'period', label: 'Period' },
      ],
    },
    education: {
      resource: education,
      title: 'Education',
      description: 'Academic entries and formal learning milestones.',
      fields: [
        { name: 'institution', label: 'Institution', required: true },
        { name: 'degree', label: 'Degree', required: true },
        { name: 'field', label: 'Field' },
        { name: 'period', label: 'Period', required: true },
        { name: 'grade', label: 'Grade' },
        { name: 'description', label: 'Description', type: 'textarea', span: 2 },
        { name: 'sortOrder', label: 'Sort order', type: 'number' },
      ],
      columns: [
        { key: 'institution', label: 'Institution' },
        { key: 'degree', label: 'Degree' },
        { key: 'period', label: 'Period' },
      ],
    },
    certifications: {
      resource: certifications,
      title: 'Certifications',
      description: 'Certificates, learning recognitions, or major self-study milestones.',
      fields: [
        { name: 'title', label: 'Title', required: true },
        { name: 'issuer', label: 'Issuer', required: true },
        { name: 'issuedAt', label: 'Issued at' },
        { name: 'credentialId', label: 'Credential ID' },
        { name: 'credentialUrl', label: 'Credential URL' },
        { name: 'skillsCovered', label: 'Skills covered', type: 'csv', span: 2 },
        { name: 'description', label: 'Description', type: 'textarea', span: 2 },
        { name: 'sortOrder', label: 'Sort order', type: 'number' },
      ],
      columns: [
        { key: 'title', label: 'Title' },
        { key: 'issuer', label: 'Issuer' },
        { key: 'issuedAt', label: 'Year' },
      ],
    },
    achievements: {
      resource: achievements,
      title: 'Achievements',
      description: 'Signals of achievement and proof of consistent practice.',
      fields: [
        { name: 'title', label: 'Title', required: true },
        { name: 'icon', label: 'Icon name' },
        { name: 'dateLabel', label: 'Date label' },
        { name: 'description', label: 'Description', type: 'textarea', required: true, span: 2 },
        { name: 'sortOrder', label: 'Sort order', type: 'number' },
      ],
      columns: [
        { key: 'title', label: 'Title' },
        { key: 'dateLabel', label: 'Date' },
        { key: 'icon', label: 'Icon' },
      ],
    },
  };

  const active = config[tab];

  return (
    <div className="space-y-6">
      <PageHeader title="Career data" description="Centralized management for experience, education, certifications, and achievements." />
      <div className="flex flex-wrap gap-3">
        {tabs.map((item) => (
          <button key={item.key} onClick={() => setTab(item.key)} className={`rounded-2xl px-4 py-2 text-sm ${tab === item.key ? 'bg-teal-400 text-slate-950' : 'border border-white/10 text-slate-300'}`}>
            {item.label}
          </button>
        ))}
      </div>
      <CrudResourcePage
        title={active.title}
        description={active.description}
        items={active.resource.data}
        fields={active.fields}
        columns={active.columns}
        onCreate={active.resource.createItem}
        onUpdate={(id, payload) => active.resource.updateItem.mutateAsync({ id, payload })}
        onDelete={active.resource.deleteItem.mutateAsync}
        loading={active.resource.isLoading}
      />
    </div>
  );
}
