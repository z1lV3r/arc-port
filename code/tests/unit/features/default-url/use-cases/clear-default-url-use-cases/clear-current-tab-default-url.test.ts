/*
**File:** `code/src/features/default-url/use-cases/clear-default-url-use-cases.ts`

**Method:** `clearCurrentTabDefaultUrl()`

When called for a tab with no default URL in storage
- the method should complete without error.
- the storage should remain empty for that tab.

When called for a tab with a default URL in storage
- the method should complete without error.
- the default URL should be removed from storage.
- calling `GetDefaultUrlUseCases.getCurrentTabDefaultUrl()` should return an empty string.
*/