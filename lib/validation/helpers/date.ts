export function d(value: Date | string | null): string {
  if (!value) return '';

  if (typeof value === 'string') {
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return '';
    return parsed.toLocaleDateString('en-GB');
  }

  return value.toLocaleDateString('en-GB');
}
