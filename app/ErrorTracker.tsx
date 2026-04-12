"use client";

import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_EAGLE_EYE_URL;

async function sendAlertToWazuh(alert: any) {
  try {
    // 🚨 safety check (THIS WAS MISSING)
    if (!BASE_URL) {
      console.error("EAGLE_EYE_URL is not defined in environment variables");
      return;
    }

    const res = await fetch(`${BASE_URL}/api/wazuh/alerts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alert),
    });

    // 🚨 DO NOT assume JSON OR success
    const text = await res.text();

    console.log("Eagle Eye response:", {
      status: res.status,
      body: text,
    });
  } catch (err) {
    console.error("Failed to send alert:", err);
  }
}

export default function ErrorTracker() {
  useEffect(() => {
    const handleError = (
      message: any,
      source?: any,
      lineno?: any,
      colno?: any,
      error?: any,
    ) => {
      sendAlertToWazuh({
        type: "runtime_error",
        message: String(message),
        source,
        lineno,
        colno,
        stack: error?.stack || null,
        timestamp: new Date().toISOString(),
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      sendAlertToWazuh({
        type: "unhandled_promise",
        reason: String(event.reason),
        stack: event.reason?.stack || null,
        timestamp: new Date().toISOString(),
      });
    };

    window.onerror = handleError;
    window.onunhandledrejection = handleRejection;

    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  return null;
}
