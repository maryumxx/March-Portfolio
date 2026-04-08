"use client";

import { useEffect } from "react";

async function sendAlertToWazuh(alert: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EAGLE_EYE_URL}/api/wazuh/alerts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alert),
      },
    );

    // Don't assume response is JSON
    const text = await res.text();
    console.log("Raw response from server:", text);
  } catch (err) {
    console.error("Failed to send alert:", err);
  }
}

export default function ErrorTracker() {
  useEffect(() => {
    window.onerror = function (message, source, lineno, colno, error) {
      sendAlertToWazuh({
        type: "runtime_error",
        message,
        source,
        lineno,
        colno,
        stack: error?.stack,
      });
    };

    window.onunhandledrejection = function (event) {
      sendAlertToWazuh({
        type: "unhandled_promise",
        reason: event.reason,
        stack: event.reason?.stack,
      });
    };
  }, []);

  return null;
}
