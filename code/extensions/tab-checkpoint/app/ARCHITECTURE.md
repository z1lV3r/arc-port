# `/app` Architecture

This directory holds the primary **business logic and clean architecture layers** for the extension. Dependencies point inwards: `presentation` and `infrastructure` depend on `use-cases` and `domain`, but not the other way around.

## Files
- **`dependency-provider.ts`**: The central **Dependency Injection (DI) Container** / IoC root for the application. It acts as the central registry where all interfaces are bound to their concrete implementations. 
  - It instantiates repositories, services, use cases, and presentation listeners.
  - It enforces the Singleton pattern for these classes, ensuring only one instance of each is shared across the application to manage state and logic efficiently.

  ---

## Dependency Injection (DI) Specifics

The project uses a **manual Dependency Injection** pattern rather than relying on an external DI library (like TSyringe or InversifyJS). This is centralized in the `DependencyProvider` classes (found in `/app/dependency-provider.ts` and `/entrypoints/background/dependency-provider.ts`).

### How DI is Implemented

1. **Static Singleton Registry**: The `DependencyProvider` is a class with static methods and static private properties for every service, repository, use case, and listener in the application.
2. **Lazy Instantiation**: When a dependency is requested (e.g., `DependencyProvider.getCheckpointRepository()`), the provider checks if the instance already exists in its private static property. If it does, it returns it; if it doesn't, it instantiates it, saves it, and then returns it. This enforces the **Singleton pattern** across the app context.
3. **Constructor Injection**: When a higher-level class (like a Use Case) requires dependencies (like a Repository), they are passed into its constructor. The `DependencyProvider` handles wiring these together during instantiation.

### How to Register a New Service or Use Case

When you create a new class that needs to be injected, follow these steps to register it:

1. **Define the Property and Getter**: Open the relevant `dependency-provider.ts` file and add a private static property and a public static getter method for your new class.
2. **Instantiate and Inject**: Inside the getter method, implement the lazy-loading singleton pattern. If your new class requires its own dependencies in its constructor, call the respective getters for those dependencies from within the provider.
3. **Use the Provider**: In your application code (like a React component or a background listener registry), never instantiate the class directly with `new`. Instead, call `DependencyProvider.getYourNewService()` to retrieve the shared instance.


## Folders
- `/domain`
- `/use-cases`
- `/infrastructure`
- `/presentation`
