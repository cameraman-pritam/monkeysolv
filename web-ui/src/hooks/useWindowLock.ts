import { useEffect, useState, useCallback, useRef } from 'react';

export interface WindowLockOptions {
  enabled: boolean;
  watermark?: string;
  onTerminate?: () => void;
  onWarning?: (strike: number) => void;
}

export function useWindowLock({
  enabled,
  watermark = '#X7P',
  onTerminate,
  onWarning,
}: WindowLockOptions) {
  const [strikes, setStrikes] = useState<number>(0);
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [isTerminated, setIsTerminated] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const lastViolationTime = useRef<number>(0);

  // Request fullscreen
  const requestFullscreen = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      // Fullscreen might be blocked by browser user-gesture requirements
    }
  }, []);

  // Exit fullscreen
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Ignore exit fullscreen errors
    }
  }, []);

  // Handle violation trigger
  const handleViolation = useCallback((reason: string) => {
    if (!enabled || isTerminated) return;

    const now = Date.now();
    // Debounce violations within 1.5 seconds to prevent double firing (e.g. blur + visibilitychange together)
    if (now - lastViolationTime.current < 1500) return;
    lastViolationTime.current = now;

    setStrikes(prev => {
      const nextStrikes = prev + 1;
      if (nextStrikes === 1) {
        setIsWarningOpen(true);
        onWarning?.(1);
      } else if (nextStrikes >= 2) {
        setIsWarningOpen(false);
        setIsTerminated(true);
        onTerminate?.();
      }
      return nextStrikes;
    });
  }, [enabled, isTerminated, onTerminate, onWarning]);

  // Handle Return to test after warning
  const dismissWarning = useCallback(() => {
    setIsWarningOpen(false);
    requestFullscreen();
  }, [requestFullscreen]);

  // Reset strikes
  const resetLock = useCallback(() => {
    setStrikes(0);
    setIsWarningOpen(false);
    setIsTerminated(false);
    exitFullscreen();
  }, [exitFullscreen]);

  useEffect(() => {
    if (!enabled) return;

    // 1. Prevent context menu, copy, paste, selectstart
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    // 2. Visibility change & blur handlers
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('Tab switched or minimized');
      }
    };

    const handleBlur = () => {
      // Triggered when focus leaves window (dual monitor click, popup, app switch)
      handleViolation('Window lost focus');
    };

    // 3. Fullscreen change listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement && enabled && !isTerminated) {
        handleViolation('Exited fullscreen mode');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Apply global CSS user-select lock
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.userSelect = '';
    };
  }, [enabled, handleViolation, isTerminated]);

  return {
    strikes,
    isWarningOpen,
    isTerminated,
    isFullscreen,
    watermark,
    requestFullscreen,
    dismissWarning,
    resetLock,
  };
}
