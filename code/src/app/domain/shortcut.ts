export interface Shortcut {
  name: string;
  description: string;
  key: {
    default: string;
    mac: string;
  };
  command: () => Promise<void>;
}
