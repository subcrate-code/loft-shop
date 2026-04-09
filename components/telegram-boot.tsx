"use client";

import { useEffect } from "react";

import { getTelegramWebApp } from "@/lib/telegram";

function applySafeAreaVariables() {
  const webApp = getTelegramWebApp();
  const root = document.documentElement;
  const inset = webApp?.contentSafeAreaInset || webApp?.safeAreaInset;

  root.style.setProperty("--tg-safe-top", `${inset?.top || 0}px`);
  root.style.setProperty("--tg-safe-right", `${inset?.right || 0}px`);
  root.style.setProperty("--tg-safe-bottom", `${inset?.bottom || 0}px`);
  root.style.setProperty("--tg-safe-left", `${inset?.left || 0}px`);
}

export function TelegramBoot() {
  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    try {
      webApp.ready();
      webApp.expand();
      webApp.setHeaderColor?.("bg_color");
      webApp.setBackgroundColor?.("bg_color");
    } catch {
      // ignore client API mismatch
    }

    document.documentElement.dataset.telegram = "true";
    document.documentElement.dataset.theme = webApp.colorScheme || "dark";
    applySafeAreaVariables();

    const handleTheme = () => {
      document.documentElement.dataset.theme = getTelegramWebApp()?.colorScheme || "dark";
      applySafeAreaVariables();
    };

    webApp.onEvent?.("themeChanged", handleTheme);
    webApp.onEvent?.("safeAreaChanged", handleTheme);
    webApp.onEvent?.("contentSafeAreaChanged", handleTheme);

    return () => {
      webApp.offEvent?.("themeChanged", handleTheme);
      webApp.offEvent?.("safeAreaChanged", handleTheme);
      webApp.offEvent?.("contentSafeAreaChanged", handleTheme);
    };
  }, []);

  return null;
}
