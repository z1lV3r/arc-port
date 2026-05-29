# Architecture layers

## Presentation
- Will never depend on infrastructure
- Will depend only on other presentation layers or use cases
- Will take care about dependency injection

## Domain
- Will know about infrastructure interfaces
- Will depend only on models and use cases

## Infrastructure
- Will implement infrastructure interfaces

# Conventions
- Files and folders are named using kebab-case
- Classes are named using PascalCase
- Interfaces are named using PascalCase with the suffix 'Service'
- Imports are grouped by type and ordered alphabetically
- Imports should be relative to the file they are imported in
- Exceptions:
    - Imports should not have a more than one leading ../, use @ instead
    - Imports should have a leading @ if its from another layer
