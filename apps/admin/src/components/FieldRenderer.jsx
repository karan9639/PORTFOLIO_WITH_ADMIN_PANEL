import { useUploadFile } from '../hooks/useResource.js';
import toast from 'react-hot-toast';

export default function FieldRenderer({ field, register, errors, watch, setValue }) {
  const uploader = useUploadFile();
  const value = watch(field.name);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const kind = field.fileKind || (file.type === 'application/pdf' || field.accept === 'application/pdf' ? 'resume' : 'image');
      const uploaded = await uploader.mutateAsync({ file, kind });
      setValue(field.name, uploaded.url, { shouldDirty: true, shouldValidate: true });
      toast.success(`${field.label} uploaded via ${uploaded.provider === 'cloudinary' ? 'Cloudinary' : 'local storage'}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Upload failed');
    }
  };

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="admin-label">{field.label}</label>
        <textarea rows={field.rows || 5} {...register(field.name)} className="admin-input min-h-[120px]" placeholder={field.placeholder} />
        {field.help ? <p className="mt-2 text-xs text-slate-500">{field.help}</p> : null}
        {errors[field.name] ? <p className="mt-2 text-sm text-rose-300">{errors[field.name]?.message}</p> : null}
      </div>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300">
        <input type="checkbox" {...register(field.name)} className="h-4 w-4" />
        {field.label}
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        <label className="admin-label">{field.label}</label>
        <select {...register(field.name)} className="admin-input">
          <option value="">Select {field.label}</option>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors[field.name] ? <p className="mt-2 text-sm text-rose-300">{errors[field.name]?.message}</p> : null}
      </div>
    );
  }

  if (field.type === 'file-url') {
    const isPdf = value?.toLowerCase?.().includes('.pdf') || field.accept === 'application/pdf' || field.fileKind === 'resume';

    return (
      <div>
        <label className="admin-label">{field.label}</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input {...register(field.name)} className="admin-input flex-1" placeholder={field.placeholder || 'https://'} />
          <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:bg-white/5">
            Upload file
            <input type="file" className="hidden" accept={field.accept || 'image/*,application/pdf'} onChange={handleFileChange} />
          </label>
        </div>
        {value ? (
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="break-all text-xs text-slate-500">{value}</p>
            {isPdf ? (
              <a href={value} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm text-teal-200 hover:text-teal-100">
                View uploaded resume
              </a>
            ) : (
              <img src={value} alt={field.label} className="mt-3 h-28 w-28 rounded-2xl object-cover" />
            )}
          </div>
        ) : null}
        {field.help ? <p className="mt-2 text-xs text-slate-500">{field.help}</p> : null}
        {errors[field.name] ? <p className="mt-2 text-sm text-rose-300">{errors[field.name]?.message}</p> : null}
      </div>
    );
  }

  return (
    <div>
      <label className="admin-label">{field.label}</label>
      <input type={field.type || 'text'} {...register(field.name)} className="admin-input" placeholder={field.placeholder} />
      {field.help ? <p className="mt-2 text-xs text-slate-500">{field.help}</p> : null}
      {errors[field.name] ? <p className="mt-2 text-sm text-rose-300">{errors[field.name]?.message}</p> : null}
    </div>
  );
}
