# `/app/presentation/messages` Architecture

**Description:** Manages internal communication between different extension contexts (e.g., background service worker communicating with the popup or content scripts).

- **Use Case Subdirectories:** The `messages` directory is strictly organized into subdirectories that correspond 1:1 with the application's core Use Cases (e.g., `/clear-checkpoint`, `/set-checkpoint`, `/reset-tab-to-checkpoint`, `/get-checkpoint`). Each subdirectory encapsulates all the messaging infrastructure required to trigger that specific use case remotely.
- **Senders (`_*-message-event-sender.ts`)**: Wrapper classes (often prefixed with an underscore to group them at the top of the directory) that group all the related operations for a particular Use Case to send messages through the browser's messaging API.

  - **Underscore Prefix (`_`)**: Used in message senders (e.g., `_clear-checkpoint-message-event-sender.ts`) to visually group and differentiate them from listeners within the same directory.

- **Listeners (`*-message-event-listener.ts`)**: Receivers that implement the `MessageEventListener` interface. Each listener class is strictly associated with exactly **one operation** from the Use Case. When their targeted message payload is received, they invoke the corresponding method on the injected Use Case class.

## Folders
- `/clear-checkpoint`
- `/get-checkpoint`
- `/reset-tab-to-checkpoint`
- `/set-checkpoint`
