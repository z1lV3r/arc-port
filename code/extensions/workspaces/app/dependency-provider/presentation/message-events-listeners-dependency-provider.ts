import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";

export class MessageEventsListenersDependencyProvider {
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if (this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
    ];

    return this.messageEventListeners;
  }
}
