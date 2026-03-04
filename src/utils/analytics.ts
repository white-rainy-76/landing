declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Safe GA4 event wrapper */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}

