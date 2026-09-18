export default async function handler(request, response) {

  // --------------------------------
  // Allow POST requests only
  // --------------------------------

  if (request.method !== "POST") {
    return response.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {

    const { messages, products } = request.body;

    // --------------------------------
    // Validate conversation
    // --------------------------------

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return response.status(400).json({
        success: false,
        message: "Conversation messages are required"
      });
    }

    // --------------------------------
    // Gemini API Key
    // --------------------------------

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

    // --------------------------------
    // Winova Product Catalogue
    // --------------------------------

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

    // --------------------------------
    // Winova Assistant Instructions
    // --------------------------------

    const systemInstruction = `
You are the Winova Wine Assistant, the AI assistant for Winova, an online wine store.

YOUR ROLE

Help customers with:

- Winova wines and products
- Wine recommendations
- Food and wine pairing
- Wine varieties
- Wine terminology
- Wine regions and origins
- Wine serving
- Wine storage
- Wine education
- Winova delivery
- Winova checkout and payment questions

WINOVA STORE INFORMATION

Standard Delivery: ₦2,500.
Express Delivery: ₦5,000.

Payments are processed securely through Paystack.

WINOVA PRODUCT CATALOGUE

${productCatalogue}

IMPORTANT PRODUCT RULES

When answering questions specifically about Winova:

- Use only products contained in the Winova catalogue above.
- Never invent a Winova product.
- Never invent a product price.
- Never claim that Winova sells a product that is not listed.
- Never change the price of a listed product.
- Use Nigerian Naira (₦) when displaying prices.
- If a customer asks for something Winova does not currently sell, say that it is not currently listed in the catalogue.

GENERAL WINE QUESTIONS

You may use your general wine knowledge to answer questions about:

- Wine types
- Grape varieties
- Food pairing
- Wine regions
- Serving temperature
- Storage
- Wine terminology
- Choosing wine
- General wine education

Clearly distinguish between general wine advice and products actually sold by Winova.

RECOMMENDATIONS

When recommending products:

- Consider the customer's stated budget.
- Consider their preferred wine type when provided.
- Consider food pairing when relevant.
- Recommend only Winova products when the user specifically asks what they can buy from Winova.
- Explain briefly why a recommendation may suit them.

CONVERSATION STYLE

- Be friendly and conversational.
- Keep answers reasonably concise.
- Use simple language where possible.
- You are a wine-store assistant, not a general-purpose assistant.

If the user asks something completely unrelated to wine or Winova, politely explain that you specialise in wine and the Winova store.
`;

    // --------------------------------
    // Convert our conversation into
    // readable conversation context
    // --------------------------------

    const conversation = messages
      .map((message) => {

        const speaker =
          message.role === "assistant"
            ? "Winova Assistant"
            : "Customer";

        return `${speaker}: ${message.content}`;

      })
      .join("\n\n");

    // --------------------------------
    // Gemini Interactions API
    // --------------------------------

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },

        body: JSON.stringify({
          model: "gemini-3.6-flash",

          system_instruction:
            systemInstruction,

          input: `
Below is the conversation so far.

Continue the conversation by responding to the customer's latest message.

${conversation}
`,

          generation_config: {
            temperature: 0.5
          }
        })
      }
    );

    // --------------------------------
    // Read Gemini response
    // --------------------------------

    const geminiData =
      await geminiResponse.json();

    // --------------------------------
    // Handle Gemini errors
    // --------------------------------

    if (!geminiResponse.ok) {

      console.error(
        "Gemini API Error:",
        geminiData
      );

      return response.status(
        geminiResponse.status
      ).json({
        success: false,

        message:
          geminiData?.error?.message ||
          "Unable to generate AI response"
      });
    }

    // --------------------------------
    // Extract text from Interactions
    // API response
    // --------------------------------

    const assistantResponse =
      geminiData?.steps
        ?.filter(
          (step) =>
            step.type === "model_output"
        )
        ?.flatMap(
          (step) =>
            step.content || []
        )
        ?.filter(
          (content) =>
            content.type === "text"
        )
        ?.map(
          (content) =>
            content.text
        )
        ?.join("\n")
        ?.trim();

    // --------------------------------
    // Ensure Gemini returned text
    // --------------------------------

    if (!assistantResponse) {

      console.error(
        "Gemini returned no text:",
        geminiData
      );

      return response.status(500).json({
        success: false,
        message:
          "The AI did not return a response"
      });
    }

    // --------------------------------
    // Send AI response to React
    // --------------------------------

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