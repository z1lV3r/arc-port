# `/app/use-cases` Architecture

Contains application-specific business rules. It orchestrates the flow of data between the presentation layer and the domain/infrastructure layers.

- **File Types (`*-use-cases.ts`)**: Classes that receive commands from the presentation layer (e.g., a user clicking a button), interact with interfaces (like `TabsService` or `CheckpointRepository`), and execute the logic required to fulfill the user's request.

## Files
- `clear-checkpoint-use-cases.ts`: Contains logic for clearing existing checkpoints for one or multiple tabs.
- `extension-action-setting-use-cases.ts`: Handles the execution flow related to updating or checking the default extension icon click behavior.
- `get-checkpoint-use-cases.ts`: Manages logic for retrieving one or multiple checkpoints.
- `reset-tab-to-checkpoint-use-cases.ts`: Contains the core logic to revert a tab's URL to its currently saved checkpoint.
- `set-checkpoint-use-cases.ts`: Orchestrates the saving of new checkpoints for specific tabs.
- `show-checkpoint-use-cases.ts`: Connects business logic related to bringing a tab with a checkpoint into focus.
- `show-context-menu-setting-use-cases.ts`: Handles logic for updating user preferences regarding context menu visibility.
