/*
**File:** `code/src/features/default-url/use-cases/reset-tab-to-default-url-use-cases.ts`
**Method:** `resetOrCloseCurrentTabToDefaultUrl()`

When called for a tab with no default URL in storage
- the tab should be closed.
- no new tab should be created.

When called for a tab where the current URL matches the default URL
- the tab should be closed.
- no new tab should be created.

When called for a tab where the current URL differs from the default URL
- the original tab should be closed.
- a new tab should be created with the default URL.
- the new tab should be at the same index position as the original tab.
- the default URL should be saved in storage for the new tab ID.

When called for a tab currently displaying "https://example.com" with default URL "https://google.com"
- the tab showing "https://example.com" should be closed.
- a new tab showing "https://google.com" should be created.
*/