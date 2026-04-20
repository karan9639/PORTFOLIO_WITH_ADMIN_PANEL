import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldRenderer from './FieldRenderer.jsx';
import { fromPairTextarea, fromTagString, toPairTextarea, toTagString } from '../lib/utils.js';

const requiredString = (label) => z.string().min(1, `${label} is required`);

function buildSchema(fields) {
  const shape = {};
  fields.forEach((field) => {
    if (field.type === 'checkbox') shape[field.name] = z.boolean().optional();
    else if (field.type === 'number') shape[field.name] = z.coerce.number().optional();
    else if (field.type === 'select') shape[field.name] = requiredString(field.label);
    else if (field.required) shape[field.name] = requiredString(field.label);
    else shape[field.name] = z.any().optional();
  });
  return z.object(shape);
}

function normalizeDefaults(fields, initialData = {}) {
  const values = {};
  fields.forEach((field) => {
    let currentValue = initialData?.[field.name];
    if (field.type === 'csv') currentValue = toTagString(currentValue || []);
    if (field.type === 'pairs') currentValue = toPairTextarea(currentValue || []);
    if (field.type === 'checkbox') currentValue = Boolean(currentValue);
    if (currentValue === undefined || currentValue === null) currentValue = field.type === 'checkbox' ? false : '';
    values[field.name] = currentValue;
  });
  return values;
}

function normalizePayload(fields, values) {
  const payload = { ...values };
  fields.forEach((field) => {
    if (field.type === 'csv') payload[field.name] = fromTagString(values[field.name]);
    if (field.type === 'pairs') payload[field.name] = fromPairTextarea(values[field.name]);
  });
  return payload;
}

export default function CrudModalForm({ fields, initialData, onSubmit, onCancel, submitLabel = 'Save', loading = false }) {
  const form = useForm({
    resolver: zodResolver(buildSchema(fields)),
    defaultValues: normalizeDefaults(fields, initialData),
  });

  useEffect(() => {
    form.reset(normalizeDefaults(fields, initialData));
  }, [initialData]);

  const handleSubmit = form.handleSubmit((values) => onSubmit(normalizePayload(fields, values)));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.span === 2 ? 'md:col-span-2' : ''}>
            <FieldRenderer field={field} register={form.register} errors={form.formState.errors} watch={form.watch} setValue={form.setValue} />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-4">
        {onCancel ? <button type="button" onClick={onCancel} className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-slate-300">Cancel</button> : null}
        <button disabled={loading} className="rounded-2xl bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-70">
          {loading ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
