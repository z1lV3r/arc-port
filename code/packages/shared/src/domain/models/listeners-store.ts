import type { Listener } from "./listener";

export class ListenersStore {
  private listeners: Map<string, Listener>;

  constructor() {
    this.listeners = new Map<string, Listener>();
  }

  addListeners(listeners: Listener[][]) {
    listeners.flat().forEach((listener) => {
      this.listeners.set(listener.name, listener);
    });
  }

  getListener(name: string) {
    return this.listeners.get(name);
  }

  getAllListeners() {
    return this.listeners.entries();
  }
}
