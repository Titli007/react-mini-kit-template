'use client'

import { ReactNode, useEffect, useState } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  const [isWorldApp, setIsWorldApp] = useState<boolean>(false);
  const appId = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    // Check if running in World App environment
    const checkEnvironment = () => {
      // You can add additional checks here
      return typeof window !== 'undefined' && 
             // Check for World App specific properties
             'WorldApp' in window;
    };

    const installMiniKit = async () => {
      if (!checkEnvironment()) {
        console.error('MiniKit can only be installed in World App environment');
        setIsWorldApp(false);
        return;
      }

      setIsWorldApp(true);

      try {
        if (!appId) {
          throw new Error('App ID is not configured');
        }

        await MiniKit.install(appId);
        
        // Check installation status
        const checkInstallation = () => {
          if (MiniKit.isInstalled()) {
            console.log('MiniKit successfully installed');
          } else {
            throw new Error('MiniKit installation failed');
          }
        };

        // Give some time for installation to complete
        setTimeout(checkInstallation, 1000);

      } catch (error) {
        console.error('MiniKit installation error:', error);
        // You might want to show a user-friendly error message here
        // or implement retry logic
      }
    };

    installMiniKit();
  }, [appId]);

  // Optionally render different content based on environment
  if (!isWorldApp) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
        This feature requires World App to function. Please open this application in World App.
      </div>
    );
  }

  return <>{children}</>;
}