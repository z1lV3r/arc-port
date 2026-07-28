# `/locales` Architecture

Manages internationalization (i18n).

## Files
- **`en.yaml`**: Contains localized string definitions for the English language. WXT's `@wxt-dev/i18n/module` parses this to generate TypeScript types and the standard Chrome `messages.json` file in the final build.
