export interface ContextMenuListener {
  name: string;
  description: string;
  command: (tabId: string) => Promise<void>;
}
