import { DependencyProvider as AppDependencyProvider } from "@/app/dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { MessageEventListenerUseCases } from "../use-cases/message-event-listeners-use-cases";

export class MessageEventListenerProvider {
  private useCaseEventListenersUseCases: MessageEventListenerUseCases;

  constructor(
    useCaseEventListenersUseCases: MessageEventListenerUseCases = DependencyProvider.getUseCaseEventListenersUseCases(),
  ) {
    this.useCaseEventListenersUseCases = useCaseEventListenersUseCases;
  }

  registerFeaturesMessageEventListeners() {
    this.useCaseEventListenersUseCases.registerMessageEventListeners([
      AppDependencyProvider.getMessageEventListeners(),
    ]);
  }
}
