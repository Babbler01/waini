import { useState } from "react";

function ChatInput({
  onSendMessage,
  isLoading
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = input.trim();

    if (!message) {
      return;
    }

    onSendMessage(message);

    setInput("");
  };

  return (
    <form
      className="chat-input"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Ask Winova about wine..."
        value={input}
        onChange={(event) =>
          setInput(event.target.value)
        }
      />

        <button
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? "Thinking..." : "Send"}
        </button>

    </form>
  );
}

export default ChatInput;