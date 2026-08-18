import type { Window } from "../models/window";

export interface BrowserWindowService {
  create(url?: string | string[] | undefined): Promise<Window>;
}