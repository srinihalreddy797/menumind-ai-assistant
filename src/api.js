const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


export async function sendChatMessage(message, history) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Unable to reach MenuMind AI.");
  }

  return response.json();
}
