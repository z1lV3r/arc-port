import type { Listener } from "@repo/shared/domain/models/listener";

export class DependencyProvider {

    static getMessageEventListeners(): Listener[] {
        return [];
    }
}