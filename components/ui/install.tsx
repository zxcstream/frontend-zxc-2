"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { IconBrandAndroid, IconDownload } from "@tabler/icons-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // Prevent the browser from showing it automatically
      setDeferredPrompt(e); // Save event for later
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt) return null; // Only show button if prompt is available

  return (
    <Button
      variant="destructive"
      onClick={async () => {
        deferredPrompt.prompt(); // Shows native browser popup
        const choice = await deferredPrompt.userChoice;
        console.log("User choice:", choice.outcome);
        setDeferredPrompt(null); // Hide Button after choice
      }}
    >
      <IconDownload />
      <span className="lg:block hidden">Install App</span>
    </Button>
  );
}
