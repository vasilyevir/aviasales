export interface Filter {
  name: string;
  title?: string;
  type: string;
  value: Array<{ name: string; value: string}>
}
