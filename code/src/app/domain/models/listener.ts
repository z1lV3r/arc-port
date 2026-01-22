export interface Listener {
  name: string;
  description: string;
  command: (...args: any) => Promise<void>;
}