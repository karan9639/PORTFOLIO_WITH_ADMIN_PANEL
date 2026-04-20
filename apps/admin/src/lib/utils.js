export function toTagString(value) {
  if (!value) return "";
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

export function fromTagString(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toPairTextarea(items = []) {
  return items.map((item) => `${item.label}|${item.value}`).join("\n");
}

export function fromPairTextarea(value = "") {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return { label: label?.trim() || "", value: rest.join("|").trim() };
    })
    .filter((item) => item.label && item.value);
}
