export function d(value: Date | null): string {
  return value ? value.toLocaleDateString('en-GB') : '';
}
