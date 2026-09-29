/**
 * Envoie le RSVP vers Google Apps Script (Google Sheets).
 * Content-Type text/plain pour éviter les problèmes CORS depuis le domaine custom.
 */
export async function submitRsvp(googleScriptUrl, payload) {
  const response = await fetch(googleScriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, error: "invalid_response" };
  }
}

export function readRsvpForm(form) {
  return {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    attendance: form.attendance.value,
    guests: form.guests.value,
    shuttle: form.shuttle?.value || "",
    dietary: form.dietary?.value.trim() || "",
    message: form.message?.value.trim() || "",
  };
}
