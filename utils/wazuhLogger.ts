export async function sendAlertToWazuh(alert: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EAGLE_EYE_URL}/api/wazuh/alerts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      },
    );
    const data = await res.json();
    console.log("Wazuh response:", data);
  } catch (err) {
    console.error("Failed to send alert to Wazuh:", err);
  }
}
