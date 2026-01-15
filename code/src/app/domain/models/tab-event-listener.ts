export interface TabEventListener {
  name: string;
  command: (tabId: string) => Promise<void>;
}
