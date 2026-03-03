import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share } from 'lucide-react';
import { Button } from './ui/button';
import {
  isPWA,
  isIOS,
  canInstall,
  showInstallPrompt,
  getIOSInstallInstructions,
} from '../utils/pwa';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Don't show if already installed
    if (isPWA()) {
      return;
    }

    // Check if iOS
    if (isIOS()) {
      setIsIOSDevice(true);
      // Show iOS install instructions after a delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    // For Android, wait for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      // Store the event
      (window as any).deferredPrompt = e;
      // Show the prompt
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOSDevice) {
      // iOS users need to manually add to home screen
      return;
    }

    // Android install
    const installed = await showInstallPrompt();
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem('kayurveda_install_dismissed', Date.now().toString());
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('kayurveda_install_dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSince = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (!canInstall() || !showPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="fixed bottom-24 left-4 right-4 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 shadow-2xl">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-white mb-1">
                    Install Kayurveda
                  </h3>
                  <p className="text-sm text-gray-400">
                    Get the full app experience with offline access and notifications
                  </p>
                </div>
              </div>

              {isIOSDevice ? (
                <div className="bg-black/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white text-sm mb-3">
                    <Share className="w-4 h-4" />
                    <span className="font-medium">How to install:</span>
                  </div>
                  {getIOSInstallInstructions().map((instruction, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    onClick={handleInstall}
                    className="flex-1 bg-white text-black hover:bg-gray-200 h-11"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install App
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    Not now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
