import type { Window } from "../models/window";

export interface BrowserWindowService {
  create(url?: string | string[] | undefined): Promise<Window>;
  getCurrentWindow(): Promise<Window>;
  focus(windowId: number): Promise<void>;
}