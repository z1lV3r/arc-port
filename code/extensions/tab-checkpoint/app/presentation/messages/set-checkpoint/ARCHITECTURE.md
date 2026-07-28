# `/app/presentation/messages/set-checkpoint` Architecture

## Files
- `_set-checkpoint-message-event-sender.ts`: Contains methods to send set checkpoint events.
- `set-current-tab-checkpoint-message-event-listener.ts`: Receives requests to set the current tab's checkpoint.
- `set-tab-checkpoint-if-unset-message-event-listener.ts`: Receives requests to set a checkpoint only if it's currently unset.
