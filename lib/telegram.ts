export function getTelegramWebApp() {
  if (typeof window === "undefined") return undefined;
  return window.Telegram?.WebApp;
}

export function getTelegramUser() {
  return getTelegramWebApp()?.initDataUnsafe.user;
}

export function inTelegramMiniApp() {
  return Boolean(getTelegramWebApp());
}

export function triggerTelegramHaptic(style: "light" | "medium" | "heavy" = "light") {
  const webApp = getTelegramWebApp();
  webApp?.HapticFeedback?.impactOccurred(style);
}
