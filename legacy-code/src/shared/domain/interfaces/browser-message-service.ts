export interface BrowserMessageService {
  sendEventMessage(listenerName: string, message: any): Promise<any>;
}