# `/app/presentation/browser-events/settings-event-listeners` Architecture

**Description:** Handles changes in user preferences/settings, updating the extension's active behavior (like which menus or actions are shown).
**Interface Implemented:** `SettingChangeListener`

## Files
- `extension-action-setting.ts`: Updates behavior based on what the user configured the primary extension action to be.
- `show-context-menu-setting.ts`: Adds or removes context menus based on user preference.
