import { useState } from "react";

function ChatInput({
  onSendMessage,
  disabled
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input.trim() || disabled) return;

    onSendMessage(input);

    setInput("");
  };

  return (
    <form
      className="assistant-chat-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        value={input}
        onChange={(event) =>
          setInput(event.target.value)
        }
        placeholder="Ask Waini about wine..."
        disabled={disabled}
        aria-label="Ask Waini Assistant"
      />

      <button
        type="submit"
        disabled={
          disabled || !input.trim()
        }
        aria-label="Send message"
      >
        <span>Send</span>
        <span className="send-arrow">↗</span>
      </button>

    </form>
  );
}

export default ChatInput;