"use client";

import { useEffect } from "react";

/**
 * Removes the Next.js Dev Menu portal/button in development only.
 */
export default function DevMenuHider(): null {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const removeDevMenu = () => {
      const portal = document.querySelector("nextjs-portal");
      if (portal && portal.parentElement) {
        // Remove the entire portal to ensure the button and menu are gone
        portal.parentElement.removeChild(portal);
      }
      // Also try common containers and aria labels
      document.querySelectorAll("[data-nextjs-dev-overlay-root], #nextjs-dev-overlay, button[aria-label='Open Dev Menu']").forEach((el) => {
        el.remove();
      });
    };

    // Run immediately
    removeDevMenu();

    // Observe DOM changes since Next may re-inject during HMR
    const observer = new MutationObserver(() => removeDevMenu());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}


