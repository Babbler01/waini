import { useState } from "react";
import SuggestedQuestions from "../components/assistant/SuggestedQuestions";
import ChatMessages from "../components/assistant/ChatMessages";
import ChatInput from "../components/assistant/ChatInput";
import wines from "../data/products";
import { sendMessageToAssistant } from "../services/assistantService";
import "../styles/assistant.css";

function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Waini. I'm your personal wine assistant. Ask me about our wines, food pairings, wine varieties, delivery, or finding the right bottle for your budget."
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

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
      const response = await sendMessageToAssistant(
        updatedMessages,
        wines
      );

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: response
        }
      ]);
    } catch (error) {
      console.error("Waini Assistant Error:", error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't answer that right now. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="wine-assistant-page">

      <div className="assistant-workspace">

        {/* LEFT PANEL */}

        <aside className="assistant-sidebar">

          <div className="assistant-sidebar-top">


            <p className="section-label">
              Your Digital Sommelier
            </p>

            <h1>
              Discover
              <span>wine.</span>
            </h1>

            <p className="assistant-sidebar-description">
              Ask Waini about our collection, food
              pairings, wine styles, budgets and
              choosing the right bottle for any
              occasion.
            </p>

          </div>


          <div className="assistant-sidebar-suggestions">

            <p className="assistant-try-label">
              Try one
            </p>

            <SuggestedQuestions
              onQuestionClick={handleSendMessage}
              disabled={isLoading}
            />

          </div>

        </aside>


        {/* CHAT AREA */}

        <section className="assistant-chat-panel">

          <header className="assistant-panel-header">

            <div className="assistant-panel-title">

              <span className="assistant-online-dot"></span>

              <strong>
                Waini Assistant
              </strong>

            </div>

            <span className="assistant-panel-meta">
              AI Wine Guide
            </span>

          </header>


          <div className="assistant-chat-body">

            <ChatMessages
              messages={messages}
              isLoading={isLoading}
            />

          </div>


          <div className="assistant-composer">

            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
            />

            <p>
              Waini Assistant can make mistakes.
              Please verify important information.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Assistant;