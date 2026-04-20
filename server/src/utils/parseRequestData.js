const jsonFields = new Set(['technologies', 'highlights', 'seoKeywords']);

export function parseRequestData(body = {}) {
  const parsed = {};
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== 'string') {
      parsed[key] = value;
      continue;
    }
    if (jsonFields.has(key)) {
      try {
        parsed[key] = JSON.parse(value);
      } catch {
        parsed[key] = value.split(',').map((item) => item.trim()).filter(Boolean);
      }
      continue;
    }
    if (value === 'true' || value === 'false') {
      parsed[key] = value === 'true';
      continue;
    }
    if (/^-?\d+(\.\d+)?$/.test(value) && key !== 'phone') {
      parsed[key] = Number(value);
      continue;
    }
    parsed[key] = value;
  }
  return parsed;
}
