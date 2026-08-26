import { expect, test } from "./fixtures";

const WORKSPACES = [
    { id: "aaa", name: "Alpha", color: "#ff0000" },
    { id: "bbb", name: "Bravo", color: "#00ff00" },
    { id: "ccc", name: "Charlie", color: "#0000ff" },
];

async function seedWorkspaces(context: { serviceWorkers(): { evaluate: Function }[] }) {
    const [worker] = context.serviceWorkers();
    await worker!.evaluate(async (workspaces: typeof WORKSPACES) => {
        await chrome.storage.local.clear();
        for (const workspace of workspaces) {
            await chrome.storage.local.set({
                [`${workspace.id}-workspace`]: {
                    name: workspace.name,
                    iconUrl: "",
                    color: workspace.color,
                },
            });
        }
        await chrome.storage.local.set({
            workspaceOrder: workspaces.map((workspace) => workspace.id),
        });
    }, WORKSPACES);
}

/** Seeds enough workspaces that the row overflows and has to scroll. */
async function seedManyWorkspaces(
    context: { serviceWorkers(): { evaluate: Function }[] },
    count: number,
) {
    const [worker] = context.serviceWorkers();
    await worker!.evaluate(async (total: number) => {
        await chrome.storage.local.clear();
        const ids: string[] = [];
        for (let i = 0; i < total; i++) {
            const id = `ws${i}`;
            ids.push(id);
            await chrome.storage.local.set({
                [`${id}-workspace`]: { name: `Workspace ${i}`, iconUrl: "", color: "#ff0000" },
            });
        }
        await chrome.storage.local.set({ workspaceOrder: ids });
    }, count);
    return Array.from({ length: count }, (_, i) => `ws${i}`);
}

async function storedOrder(context: { serviceWorkers(): { evaluate: Function }[] }) {
    const [worker] = context.serviceWorkers();
    return worker!.evaluate(
        async () => (await chrome.storage.local.get("workspaceOrder")).workspaceOrder,
    );
}

test("auto-scrolls to the end of a long row and drops into the last slot", async ({
    context,
    extensionId,
}) => {
    await seedManyWorkspaces(context, 12);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const icons = page.locator('button[aria-label$="icon"]');
    await expect(icons).toHaveCount(12);

    const viewport = page.locator("[data-radix-scroll-area-viewport]");
    const view = (await viewport.boundingBox())!;
    const maxScroll = await viewport.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(maxScroll).toBeGreaterThan(0);

    // Hold the pointer against the right edge and let auto-scroll carry the row.
    const first = (await icons.nth(0).boundingBox())!;
    await page.mouse.move(first.x + first.width / 2, first.y + first.height / 2);
    await page.mouse.down();
    await page.mouse.move(view.x + view.width - 8, first.y + first.height / 2, { steps: 8 });
    await page.waitForTimeout(800);

    // The row scrolls to its true end and stops - the transform must not inflate it.
    expect(await viewport.evaluate((el) => el.scrollLeft)).toBe(maxScroll);

    // The dragged item stays inside the visible viewport rather than being lost.
    const dragged = (await page.locator("button[data-dragging]").boundingBox())!;
    expect(dragged.x).toBeGreaterThanOrEqual(view.x - 1);
    expect(dragged.x + dragged.width).toBeLessThanOrEqual(view.x + view.width + 1);

    await page.mouse.up();

    await expect(icons.nth(11)).toHaveAttribute("aria-label", "Workspace 0 icon");
    expect(await storedOrder(context)).toEqual([
        "ws1", "ws2", "ws3", "ws4", "ws5", "ws6",
        "ws7", "ws8", "ws9", "ws10", "ws11", "ws0",
    ]);
});

test("auto-scrolls back to the front of a long row", async ({ context, extensionId }) => {
    await seedManyWorkspaces(context, 12);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const icons = page.locator('button[aria-label$="icon"]');
    await expect(icons).toHaveCount(12);

    const viewport = page.locator("[data-radix-scroll-area-viewport]");
    await viewport.evaluate((el) => {
        el.scrollLeft = el.scrollWidth;
    });
    const view = (await viewport.boundingBox())!;

    // Grab the last icon and hold against the left edge.
    const last = (await icons.nth(11).boundingBox())!;
    await page.mouse.move(last.x + last.width / 2, last.y + last.height / 2);
    await page.mouse.down();
    await page.mouse.move(view.x + 8, last.y + last.height / 2, { steps: 8 });
    await page.waitForTimeout(800);

    expect(await viewport.evaluate((el) => el.scrollLeft)).toBe(0);

    await page.mouse.up();

    await expect(icons.nth(0)).toHaveAttribute("aria-label", "Workspace 11 icon");
    expect(await storedOrder(context)).toEqual([
        "ws11", "ws0", "ws1", "ws2", "ws3", "ws4",
        "ws5", "ws6", "ws7", "ws8", "ws9", "ws10",
    ]);
});

test("drags a workspace icon to the end of the row and persists the new order", async ({
    context,
    extensionId,
}) => {
    await seedWorkspaces(context);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const icons = page.locator('button[aria-label$="icon"]');
    await expect(icons).toHaveCount(3);
    await expect(icons.nth(0)).toHaveAttribute("aria-label", "Alpha icon");

    const first = await icons.nth(0).boundingBox();
    const last = await icons.nth(2).boundingBox();

    // Drag Alpha past Charlie's midpoint.
    await page.mouse.move(first!.x + first!.width / 2, first!.y + first!.height / 2);
    await page.mouse.down();
    await page.mouse.move(last!.x + last!.width, last!.y + last!.height / 2, { steps: 10 });
    await page.mouse.up();

    await expect(icons.nth(0)).toHaveAttribute("aria-label", "Bravo icon");
    await expect(icons.nth(1)).toHaveAttribute("aria-label", "Charlie icon");
    await expect(icons.nth(2)).toHaveAttribute("aria-label", "Alpha icon");

    const [worker] = context.serviceWorkers();
    const stored = await worker!.evaluate(
        async () => (await chrome.storage.local.get("workspaceOrder")).workspaceOrder,
    );
    expect(stored).toEqual(["bbb", "ccc", "aaa"]);
});

test("drags a workspace icon leftwards to the front of the row", async ({
    context,
    extensionId,
}) => {
    await seedWorkspaces(context);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const icons = page.locator('button[aria-label$="icon"]');
    await expect(icons).toHaveCount(3);

    const first = (await icons.nth(0).boundingBox())!;
    const last = (await icons.nth(2).boundingBox())!;

    // Drag Charlie past Alpha's midpoint.
    await page.mouse.move(last.x + last.width / 2, last.y + last.height / 2);
    await page.mouse.down();
    await page.mouse.move(first.x, first.y + first.height / 2, { steps: 10 });
    await page.mouse.up();

    await expect(icons.nth(0)).toHaveAttribute("aria-label", "Charlie icon");
    await expect(icons.nth(1)).toHaveAttribute("aria-label", "Alpha icon");
    await expect(icons.nth(2)).toHaveAttribute("aria-label", "Bravo icon");

    const [worker] = context.serviceWorkers();
    const stored = await worker!.evaluate(
        async () => (await chrome.storage.local.get("workspaceOrder")).workspaceOrder,
    );
    expect(stored).toEqual(["ccc", "aaa", "bbb"]);
});

test("alt+arrow moves the focused workspace icon", async ({ context, extensionId }) => {
    await seedWorkspaces(context);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const icons = page.locator('button[aria-label$="icon"]');
    await expect(icons).toHaveCount(3);

    await icons.nth(0).focus();
    await page.keyboard.press("Alt+ArrowRight");

    await expect(icons.nth(0)).toHaveAttribute("aria-label", "Bravo icon");
    await expect(icons.nth(1)).toHaveAttribute("aria-label", "Alpha icon");

    // Focus follows the moved item, so a second press keeps moving Alpha.
    await page.keyboard.press("Alt+ArrowRight");
    await expect(icons.nth(2)).toHaveAttribute("aria-label", "Alpha icon");

    const [worker] = context.serviceWorkers();
    const stored = await worker!.evaluate(
        async () => (await chrome.storage.local.get("workspaceOrder")).workspaceOrder,
    );
    expect(stored).toEqual(["bbb", "ccc", "aaa"]);
});

test("a plain click does not reorder", async ({ context, extensionId }) => {
    await seedWorkspaces(context);

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    const icons = page.locator('button[aria-label$="icon"]');
    await expect(icons).toHaveCount(3);
    await icons.nth(0).click();

    await expect(icons.nth(0)).toHaveAttribute("aria-label", "Alpha icon");

    const [worker] = context.serviceWorkers();
    const stored = await worker!.evaluate(
        async () => (await chrome.storage.local.get("workspaceOrder")).workspaceOrder,
    );
    expect(stored).toEqual(["aaa", "bbb", "ccc"]);
});
