export default async function handler(request, response) {

  if (request.method !== "POST") {
    return response.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {

    const { messages, products } = request.body;

    // -----------------------------
    // Validate request
    // -----------------------------

    if (!messages || !Array.isArray(messages)) {
      return response.status(400).json({
        success: false,
        message: "Conversation messages are required"
      });
    }

    if (messages.length === 0) {
      return response.status(400).json({
        success: false,
        message: "Conversation cannot be empty"
      });
    }

    // -----------------------------
    // Gemini API Key
    // -----------------------------

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        "GEMINI_API_KEY is not configured"
      );

      return response.status(500).json({
        success: false,
        message: "AI service is not configured"
      });
    }

    // -----------------------------
    // Winova Product Catalogue
    // -----------------------------

    const productCatalogue =
      Array.isArray(products)
        ? products
            .map((product) => {
              return `
Name: ${product.name}
Category: ${product.category}
Price: ₦${product.price}
Origin: ${product.origin}
Volume: ${product.volume}
Alcohol: ${product.alcohol}
Description: ${product.description}
`;
            })
            .join("\n")
        : "No product catalogue provided.";

    // -----------------------------
    // System Instructions
    // -----------------------------

    const systemInstruction = `
You are the Winova Wine Assistant, the AI assistant for Winova, an online wine store.

Your job is to help customers with:

1. Questions about Winova wines.
2. Wine recommendations.
3. Food and wine pairing.
4. Wine varieties and terminology.
5. Wine regions and origins.
6. Wine serving and storage.
7. General wine education.
8. Winova delivery and checkout questions.

WINOVA STORE INFORMATION:

Standard Delivery: ₦2,500.
Express Delivery: ₦5,000.
Payments are processed securely through Paystack.

WINOVA PRODUCT CATALOGUE:

${productCatalogue}

IMPORTANT RULES:

- When discussing products sold by Winova, use only products in the catalogue above.
- Never invent a Winova product.
- Never invent a product price.
- Never claim Winova sells something that is not in the catalogue.
- You may answer general wine questions using your broader wine knowledge.
- Clearly distinguish general wine advice from products actually available at Winova.
- When recommending a Winova wine, consider the customer's budget and preferences when provided.
- Prices should be displayed in Nigerian Naira using ₦.
- Keep responses helpful, conversational and reasonably concise.
- If the user asks something unrelated to wine or Winova, politely explain that you specialise in wine and the Winova store.
`;

    // -----------------------------
    // Convert conversation to
    // Gemini format
    // -----------------------------

    const contents = messages.map((message) => ({
      role:
        message.role === "assistant"
          ? "model"
          : "user",

      parts: [
        {
          text: message.content
        }
      ]
    }));

    // -----------------------------
    // Send request to Gemini
    // -----------------------------

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: systemInstruction
              }
            ]
          },

          contents,

          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 500
          }
        })
      }
    );

    const geminiData =
      await geminiResponse.json();

    // -----------------------------
    // Handle Gemini errors
    // -----------------------------

    if (!geminiResponse.ok) {

      console.error(
        "Gemini API Error:",
        geminiData
      );

      return response.status(500).json({
        success: false,
        message:
          geminiData?.error?.message ||
          "Unable to generate AI response"
      });
    }

    // -----------------------------
    // Extract AI response
    // -----------------------------

    const assistantResponse =
      geminiData?.candidates?.[0]
        ?.content?.parts
        ?.map((part) => part.text)
        .join("");

    if (!assistantResponse) {

      console.error(
        "No Gemini response:",
        geminiData
      );

      return response.status(500).json({
        success: false,
        message:
          "The AI did not return a response"
      });
    }

    // -----------------------------
    // Return response to React
    // -----------------------------

    return response.status(200).json({
      success: true,
      message: assistantResponse
    });

  } catch (error) {

    console.error(
      "AI Chat Error:",
      error
    );

    return response.status(500).json({
      success: false,
      message:
        "Something went wrong while contacting the AI assistant"
    });
  }
}