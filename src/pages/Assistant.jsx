import { useState } from "react";
import SuggestedQuestions from "../components/assistant/SuggestedQuestions";
import ChatMessages from "../components/assistant/ChatMessages";
import ChatInput from "../components/assistant/ChatInput";
import { wines } from "../data/products";
import { sendMessageToAssistant } from "../services/assistantService";

function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Waini. I'm your personal wine assistant. I can help you discover wines, explore pairings, understand wine varieties, or find something from our collection."
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
      const response =
        await sendMessageToAssistant(
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
      console.error(
        "Waini Assistant Error:",
        error
      );

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
    <main className="assistant-page">

      <section className="assistant-intro">

        <div className="container assistant-intro-container">

          <div className="assistant-intro-content">

            <p className="section-label">
              Waini Wine Assistant
            </p>

            <h1>
              Your Personal
              <span> Wine Guide.</span>
            </h1>

            <p>
              Discover wines, explore food pairings,
              learn about varieties and find the
              perfect bottle from the Waini collection.
            </p>

          </div>

          <div className="assistant-intro-mark">
            <span>W</span>
          </div>

        </div>

      </section>


      <section className="assistant-experience">

        <div className="container">

          <div className="assistant-shell">

            <div className="assistant-shell-header">

              <div className="assistant-identity">

                <div className="assistant-avatar">
                  W
                </div>

                <div>
                  <h2>Waini Assistant</h2>

                  <p>
                    <span className="assistant-status-dot"></span>
                    Your digital wine guide
                  </p>
                </div>

              </div>

              <span className="assistant-ai-label">
                AI Powered
              </span>

            </div>


            <div className="assistant-suggestions-area">

              <div className="assistant-suggestions-heading">

                <span>
                  Not sure where to begin?
                </span>

                <p>
                  Try one of these questions
                </p>

              </div>

              <SuggestedQuestions
                onQuestionClick={handleSendMessage}
                disabled={isLoading}
              />

            </div>


            <div className="assistant-conversation">

              <ChatMessages
                messages={messages}
                isLoading={isLoading}
              />

            </div>


            <div className="assistant-input-area">

              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
              />

              <p className="assistant-disclaimer">
                Waini Assistant can make mistakes.
                Please verify important information.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Assistant;