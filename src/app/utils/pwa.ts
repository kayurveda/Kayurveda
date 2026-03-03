/**
 * Kayurveda PWA Utilities
 * Helper functions for Progressive Web App features
 */

// Types
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Check if app is running as PWA
export const isPWA = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
};

// Check if device is iOS
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

// Check if device is Android
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

// Check if app can be installed
export const canInstall = (): boolean => {
  return !isPWA() && (isIOS() || isAndroid());
};

// Store install prompt
let installPromptEvent: BeforeInstallPromptEvent | null = null;

export const setInstallPrompt = (event: BeforeInstallPromptEvent): void => {
  installPromptEvent = event;
};

// Show install prompt
export const showInstallPrompt = async (): Promise<boolean> => {
  if (!installPromptEvent) {
    console.warn('[Kayurveda] Install prompt not available');
    return false;
  }

  try {
    await installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[Kayurveda] User accepted install prompt');
      installPromptEvent = null;
      return true;
    } else {
      console.log('[Kayurveda] User dismissed install prompt');
      return false;
    }
  } catch (error) {
    console.error('[Kayurveda] Error showing install prompt:', error);
    return false;
  }
};

// Check online status
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const onNetworkChange = (
  onOnline: () => void,
  onOffline: () => void
): (() => void) => {
  const handleOnline = () => {
    console.log('[Kayurveda] Network: Online');
    onOnline();
  };

  const handleOffline = () => {
    console.log('[Kayurveda] Network: Offline');
    onOffline();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    console.warn('[Kayurveda] Notifications not supported');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    console.log('[Kayurveda] Notification permission:', permission);
    return permission;
  } catch (error) {
    console.error('[Kayurveda] Error requesting notification permission:', error);
    return 'denied';
  }
};

// Show notification
export const showNotification = (
  title: string,
  options?: NotificationOptions
): void => {
  if (!('Notification' in window)) {
    console.warn('[Kayurveda] Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.warn('[Kayurveda] Notification permission not granted');
    return;
  }

  try {
    const notification = new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [200, 100, 200],
      ...options,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    console.error('[Kayurveda] Error showing notification:', error);
  }
};

// Schedule reminder notification
export const scheduleReminder = (
  time: string,
  title: string,
  body: string
): void => {
  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  const scheduledTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  // If the time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const delay = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    showNotification(title, { body });
  }, delay);

  console.log('[Kayurveda] Reminder scheduled for:', scheduledTime.toLocaleString());
};

// Register for background sync
export const registerBackgroundSync = async (tag: string): Promise<boolean> => {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    console.warn('[Kayurveda] Background Sync not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await (registration as any).sync.register(tag);
    console.log('[Kayurveda] Background sync registered:', tag);
    return true;
  } catch (error) {
    console.error('[Kayurveda] Error registering background sync:', error);
    return false;
  }
};

// Share content (Web Share API)
export const shareContent = async (
  title: string,
  text: string,
  url?: string
): Promise<boolean> => {
  if (!navigator.share) {
    console.warn('[Kayurveda] Web Share API not supported');
    return false;
  }

  try {
    await navigator.share({
      title,
      text,
      url: url || window.location.href,
    });
    console.log('[Kayurveda] Content shared successfully');
    return true;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('[Kayurveda] Error sharing content:', error);
    }
    return false;
  }
};

// Add to home screen instructions for iOS
export const getIOSInstallInstructions = (): string[] => {
  return [
    'Tap the Share button',
    'Scroll down and tap "Add to Home Screen"',
    'Tap "Add" in the top right corner',
  ];
};

// Detect network speed
export const getNetworkSpeed = (): string => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) {
    return 'unknown';
  }

  const effectiveType = connection.effectiveType;
  return effectiveType || 'unknown';
};

// Check if device has low memory
export const hasLowMemory = (): boolean => {
  const memory = (performance as any).memory;
  
  if (!memory) {
    return false;
  }

  // Consider low memory if using more than 90% of available memory
  const memoryUsageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
  return memoryUsageRatio > 0.9;
};

// Get device type
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  
  if (width < 768) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Haptic feedback (for supported devices)
export const vibrate = (pattern: number | number[]): boolean => {
  if (!('vibrate' in navigator)) {
    return false;
  }

  try {
    navigator.vibrate(pattern);
    return true;
  } catch (error) {
    console.error('[Kayurveda] Error triggering vibration:', error);
    return false;
  }
};

// Cache wellness data locally
export const cacheWellnessData = (key: string, data: any): void => {
  try {
    localStorage.setItem(`kayurveda_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('[Kayurveda] Error caching data:', error);
  }
};

// Get cached wellness data
export const getCachedWellnessData = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(`kayurveda_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('[Kayurveda] Error retrieving cached data:', error);
    return null;
  }
};

// Clear all cached data
export const clearCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('kayurveda_')) {
        localStorage.removeItem(key);
      }
    });
    console.log('[Kayurveda] Cache cleared');
  } catch (error) {
    console.error('[Kayurveda] Error clearing cache:', error);
  }
};
