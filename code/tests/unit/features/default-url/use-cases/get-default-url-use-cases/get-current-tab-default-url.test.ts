/*
**File:** `code/src/features/default-url/use-cases/get-default-url-use-cases.ts`

**Method:** `getCurrentTabDefaultUrl()`

When called for a tab with no default URL in storage
- the method should return an empty string.

When called for a tab with a default URL in storage
- the method should return the stored default URL.

When called multiple times for the same tab
- the method should consistently return the same value.
*/