export {};

declare global {
  interface TelegramThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    section_bg_color?: string;
    section_separator_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
    bottom_bar_bg_color?: string;
  }

  interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
    is_premium?: boolean;
  }

  interface TelegramInitDataUnsafe {
    user?: TelegramUser;
    start_param?: string;
    query_id?: string;
  }

  interface TelegramBottomButton {
    text?: string;
    isVisible?: boolean;
    isActive?: boolean;
    isProgressVisible?: boolean;
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    onClick: (callback: VoidFunction) => void;
    offClick: (callback: VoidFunction) => void;
  }

  interface TelegramHapticFeedback {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramInitDataUnsafe;
    version: string;
    platform: string;
    colorScheme: "light" | "dark";
    themeParams: TelegramThemeParams;
    MainButton?: TelegramBottomButton;
    SecondaryButton?: TelegramBottomButton;
    HapticFeedback?: TelegramHapticFeedback;
    safeAreaInset?: { top: number; bottom: number; left: number; right: number };
    contentSafeAreaInset?: { top: number; bottom: number; left: number; right: number };
    ready: () => void;
    expand: () => void;
    setHeaderColor?: (color: string) => void;
    setBackgroundColor?: (color: string) => void;
    onEvent?: (eventType: string, callback: (...args: unknown[]) => void) => void;
    offEvent?: (eventType: string, callback: (...args: unknown[]) => void) => void;
    isExpanded?: boolean;
  }

  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}
