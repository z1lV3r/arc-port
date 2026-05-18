import { DependencyProvider } from "@/app/dependency-provider";
import { MessageEventListenerUseCases } from "../../use-cases/message-event-listeners-use-cases";
import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";
import { TabRebrandDependencyProvider } from "@/features/tab-rebrand/dependency-provider";

export class MessageEventListenerProvider {

    private useCaseEventListenersUseCases: MessageEventListenerUseCases;

    constructor(
        useCaseEventListenersUseCases: MessageEventListenerUseCases = DependencyProvider.getUseCaseEventListenersUseCases(),
    ) {
        this.useCaseEventListenersUseCases = useCaseEventListenersUseCases;
    }

    registerFeaturesMessageEventListeners() {
        this.useCaseEventListenersUseCases.registerMessageEventListeners([
            CheckpointDependencyProvider.getMessageEventListeners(),
            TabRebrandDependencyProvider.getMessageEventListeners(),
        ]);
    }

}