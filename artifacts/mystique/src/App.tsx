import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileGenerator } from "@/components/profile-generator";
import { PwaInstallBanner } from "@/components/pwa-install-banner";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { usePwaInstall } from "@/hooks/use-pwa-install";

function App() {
  const pwa = usePwaInstall();
  const [promptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
    if (!pwa.isInstalled && !pwa.isDismissed && (pwa.canInstall || pwa.isIOS)) {
      const timer = setTimeout(() => setPromptOpen(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [pwa.isInstalled, pwa.isDismissed, pwa.canInstall, pwa.isIOS]);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <PwaInstallBanner
          pwa={pwa}
          onOpenPrompt={() => setPromptOpen(true)}
        />
        <div className="flex-1 px-4 py-6 flex flex-col justify-center">
          <main className="w-full max-w-[420px] mx-auto">
            <ProfileGenerator />
          </main>
        </div>
      </div>
      <Toaster />
      <PwaInstallPrompt
        pwa={pwa}
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
      />
    </TooltipProvider>
  );
}

export default App;
