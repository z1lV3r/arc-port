# `/app/domain` Architecture

The innermost layer. It defines the core enterprise rules and models. This layer is completely isolated and has **no dependencies** on external frameworks, APIs, or UI.

## Folders
- `/interfaces`: Contains TypeScript definitions (ports) that the domain needs to interact with the outside world.
