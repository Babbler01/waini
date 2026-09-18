import { useState } from "react";
import SuggestedQuestions from "../components/assistant/SuggestedQuestions";
import ChatMessages from "../components/assistant/ChatMessages";
import ChatInput from "../components/assistant/ChatInput";
import wines from "../data/products";
import { sendMessageToAssistant } from "../services/assistantService";


function Assistant() {

    const [isLoading, setIsLoading] =
    useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Waini Wine Assistant. Ask me about our wines, recommendations, food pairings, delivery, or wine in general."
    }
  ]);

  const handleSendMessage = async (message) => {

    if (isLoading) {
        return;
    }

    const userMessage = {
        role: "user",
        content: message
    };

    const updatedMessages = [
        ...messages,
        userMessage
    ];

    setMessages(updatedMessages);

    setIsLoading(true);

    try {

        const response =
        await sendMessageToAssistant(
            updatedMessages,
            wines
        );

        const assistantMessage = {
        role: "assistant",
        content: response
        };

        setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage
        ]);

    } catch (error) {

        console.error(
        "Assistant error:",
        error
        );

        const errorMessage = {
            role: "assistant",
            content: `AI Error: ${error.message}`
        };

        setMessages((currentMessages) => [
        ...currentMessages,
        errorMessage
        ]);

    } finally {

        setIsLoading(false);

    }
    };

  return (
    <section className="assistant-page">

      <div className="assistant-header">

        <p>WAINI ASSISTANT</p>

        <h1>Your Personal Wine Guide</h1>

        <p>
          Ask questions about our wines,
          recommendations, food pairings,
          delivery, or wine in general.
        </p>

      </div>

      <div className="assistant-container">

        <SuggestedQuestions
          onQuestionClick={handleSendMessage}
        />

        <div className="assistant-chat">

          <ChatMessages
            messages={messages}
            isLoading={isLoading}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />

        </div>

      </div>

    </section>
  );
}

export default Assistant;