export async function sendMessageToAssistant(
  messages,
  products
) {
  const response = await fetch(
    "/api/ai-chat",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        messages,
        products
      })
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
      "Unable to contact Waini Assistant"
    );
  }

  return data.message;
}