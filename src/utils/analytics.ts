declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Safe GA4 event — uses gtag or queues in dataLayer if gtag.js not loaded yet */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const payload = params ?? {};
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", eventName, payload]);
  }
}

