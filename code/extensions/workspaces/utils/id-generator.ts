export function generateId(): string {
    const microtime = Math.floor((performance.timeOrigin + performance.now()) * 1000);
    return microtime.toString(36);
}