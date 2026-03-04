/**
 * InstallPrompt — Smart PWA install banner for KAYA.
 *
 * Trigger rules:
 *   • NOT shown on app open (that's annoying)
 *   • Shown after user completes dosha reveal OR first routine
 *   • Respects 7-day dismiss cooldown in localStorage
 *   • Never shown if already running as standalone PWA
 *
 * Platform handling:
 *   • Android/Chrome — uses beforeinstallprompt API
 *   • iOS Safari    — shows manual instruction modal with visual steps
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import KayaSigil from './KayaSigil';
import {
  isPWA,
  isIOS,
  showInstallPrompt,
  setInstallPrompt,
} from '../utils/pwa';

/* ── Constants ── */
const DISMISS_KEY = 'kaya_install_dismissed';
const DISMISS_COOLDOWN_DAYS = 7;

/* ── Helpers ── */
function wasDismissedRecently(): boolean {
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  const days = (Date.now() - parseInt(raw, 10)) / (1000 * 60 * 60 * 24);
  return days < DISMISS_COOLDOWN_DAYS;
}

/* ══════════════════════════════════════════════════════
   iOS Manual Instruction Modal
   ══════════════════════════════════════════════════════ */
function IOSInstructionModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        style={{
          background: '#141414',
          borderRadius: '24px 24px 0 0',
          padding: '28px 24px 36px',
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.15)',
            margin: '0 auto 24px',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <KayaSigil variant="avatar" />
          <div>
            <h3
              style={{
                fontFamily: "'Syne','Inter',system-ui,sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.12em',
                color: '#F5F0E8',
                margin: 0,
              }}
            >
              ADD KAYA TO HOME SCREEN
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans','Inter',system-ui,sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: 'rgba(245,240,232,0.5)',
                margin: '4px 0 0',
              }}
            >
              Follow these steps in Safari
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {/* Step 1 */}
          <StepRow
            number={1}
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="5" width="14" height="12" rx="2" stroke="#7FB69A" strokeWidth="1.2" />
                <path d="M10 3v7" stroke="#7FB69A" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7 6l3-3 3 3" stroke="#7FB69A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            text={
              <>
                Tap the <strong style={{ color: '#7FB69A' }}>Share</strong> button{' '}
                <span style={{ fontSize: 16, verticalAlign: 'middle' }}>□↑</span> in Safari
              </>
            }
          />

          {/* Step 2 */}
          <StepRow
            number={2}
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="#7FB69A" strokeWidth="1.2" />
                <path d="M7 10h6M10 7v6" stroke="#7FB69A" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            }
            text={
              <>
                Scroll down and tap{' '}
                <strong style={{ color: '#F5F0E8' }}>"Add to Home Screen"</strong>
              </>
            }
          />

          {/* Step 3 */}
          <StepRow
            number={3}
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#7FB69A" strokeWidth="1.2" />
                <path d="M7 10l2 2 4-4" stroke="#7FB69A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            text={
              <>
                Tap <strong style={{ color: '#F5F0E8' }}>"Add"</strong> — KAYA will appear on your
                home screen 🌿
              </>
            }
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Syne','Inter',system-ui,sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: 'rgba(245,240,232,0.45)',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          GOT IT
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Step row sub-component ── */
function StepRow({
  number,
  icon,
  text,
}: {
  number: number;
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      {/* Number badge */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(127,182,154,0.1)',
          border: '1px solid rgba(127,182,154,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ paddingTop: 5 }}>
        <span
          style={{
            fontFamily: "'DM Sans','Inter',system-ui,sans-serif",
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.55,
            color: 'rgba(245,240,232,0.7)',
          }}
        >
          <span
            style={{
              fontFamily: "'Syne','Inter',system-ui,sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: '0.15em',
              color: 'rgba(245,240,232,0.35)',
              marginRight: 8,
            }}
          >
            {number}.
          </span>
          {text}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main InstallPrompt Component
   ══════════════════════════════════════════════════════ */
export function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isIOSDevice] = useState(() => isIOS());
  const [hasPromptEvent, setHasPromptEvent] = useState(false);

  /* ── Listen for the native install-prompt event (Android/Chrome) ── */
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any);
      setHasPromptEvent(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  /* ── Public trigger: called from the outside via custom event ── */
  useEffect(() => {
    const trigger = () => {
      // Gate checks
      if (isPWA()) return;
      if (wasDismissedRecently()) return;
      if (!isIOSDevice && !hasPromptEvent) {
        // On non-iOS, only show if we actually captured a prompt event
        // (still allow it — the banner can show generic instructions)
      }
      setVisible(true);
    };

    window.addEventListener('kaya:show-install-prompt', trigger);
    return () => window.removeEventListener('kaya:show-install-prompt', trigger);
  }, [isIOSDevice, hasPromptEvent]);

  /* ── Dismiss handler (7-day cooldown) ── */
  const dismiss = useCallback(() => {
    setVisible(false);
    setShowIOSModal(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  }, []);

  /* ── Install handler ── */
  const handleInstall = useCallback(async () => {
    if (isIOSDevice) {
      setShowIOSModal(true);
      return;
    }
    const accepted = await showInstallPrompt();
    if (accepted) {
      setVisible(false);
    }
  }, [isIOSDevice]);

  /* ── Don't render anything unless triggered ── */
  if (!visible && !showIOSModal) return null;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <>
            {/* Backdrop */}
            <motion.div
              key="install-backdrop"
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: 'rgba(0,0,0,0.45)' }}
              onClick={dismiss}
            />

            {/* Banner card — slides up from bottom */}
            <motion.div
              key="install-banner"
              className="fixed bottom-0 left-0 right-0 z-50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <div
                style={{
                  background: '#141414',
                  borderRadius: '24px 24px 0 0',
                  padding: '24px 20px 32px',
                }}
              >
                {/* Content row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
                  <KayaSigil variant="avatar" />
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "'Syne','Inter',system-ui,sans-serif",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: '0.1em',
                        color: '#F5F0E8',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      Add KAYA to your home screen
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans','Inter',system-ui,sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: 'rgba(245,240,232,0.5)',
                        margin: '3px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      Get ritual reminders &amp; offline access 🌿
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
                  {/* Primary CTA — gold */}
                  <button
                    id="install-cta-button"
                    onClick={handleInstall}
                    style={{
                      width: '100%',
                      padding: '15px 0',
                      borderRadius: 14,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Syne','Inter',system-ui,sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase' as const,
                      color: '#080808',
                      background: 'linear-gradient(135deg, #C4A882 0%, #D4BA96 50%, #C4A882 100%)',
                      boxShadow: '0 2px 16px rgba(196,168,130,0.25)',
                    }}
                  >
                    ADD TO HOME SCREEN
                  </button>

                  {/* Secondary — muted text */}
                  <button
                    id="install-dismiss-button"
                    onClick={dismiss}
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      borderRadius: 14,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Syne','Inter',system-ui,sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(245,240,232,0.3)',
                      background: 'transparent',
                    }}
                  >
                    MAYBE LATER
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* iOS instruction modal */}
      <AnimatePresence>
        {showIOSModal && (
          <IOSInstructionModal
            key="ios-modal"
            onClose={() => {
              setShowIOSModal(false);
              dismiss();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   Helper: fire the custom event to show the banner.
   Call this from dosha-reveal or after first routine.
   
   Usage:
     import { triggerInstallPrompt } from './InstallPrompt';
     triggerInstallPrompt();
   ══════════════════════════════════════════════════════ */
export function triggerInstallPrompt() {
  window.dispatchEvent(new CustomEvent('kaya:show-install-prompt'));
}

export default InstallPrompt;
