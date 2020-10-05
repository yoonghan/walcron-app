import {useState, useEffect, useMemo} from 'react';

export function withPwaHooks() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [pwaPromptEvent, setPwaPromptEvent] = useState(null);
  const [isSafari, setIsSafari] = useState(false);

  const addToShortcutEvent = (e:any) => {
    e.preventDefault();
    setIsInstallable(true);
    setPwaPromptEvent(e);
  };

  const _triggerInstall = () => {
    if(pwaPromptEvent !== null) {
      pwaPromptEvent.preventDefault();
      pwaPromptEvent.prompt();
    }
  }

  const _isSafariBrowserViaJs = () => {
    return /constructor/i.test((window['HTMLElement'] as any)) || ((p): boolean => {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!(window['safari'] as any) || (window['safari'] as any).pushNotification);
  }

  const _isIOSJs = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  useEffect(() => {
    if(_isSafariBrowserViaJs() || _isIOSJs()) {
      setIsSafari(true);
    }

    window.addEventListener('beforeinstallprompt', addToShortcutEvent);

    return () => {
      window.removeEventListener('beforeinstallprompt', addToShortcutEvent);
    }
  }, []);

  const _drawnButton = useMemo(() => {
    if(isSafari) {
      return (
        <div>
          For Safari mobile users, follow these steps.
          <ol className="list-decimal text-left ml-4">
            <li>Tap on <img src="/pwa/safari-share.png" className='icon' alt="safari-share"/> "Share" icon.</li>
            <li>Then select <em>"Add Home Screen"</em>.</li>
          </ol>
        </div>
      );
    }
    else {
      return (
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ${!isInstallable?'opacity-50 cursor-not-allowed':''}`}
          disabled={!isInstallable}
          onClick={_triggerInstall}>Add to Homescreen</button>
      )
    }
  }, [isSafari, isInstallable, pwaPromptEvent]);

  return {
    drawnPwaButton: _drawnButton,
    isInstallable: isInstallable
  };
}
