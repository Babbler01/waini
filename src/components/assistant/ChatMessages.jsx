function ChatMessages({
  messages,
  isLoading
}) {
  return (
    <div className="chat-messages">

      {messages.map((message, index) => (

        <div
          key={index}
          className={`chat-message ${
            message.role === "user"
              ? "chat-message-user"
              : "chat-message-assistant"
          }`}
        >

          <div className="message-label">
            {message.role === "user"
              ? "You"
              : "Waini Assistant"}
          </div>

          <div className="message-content">
            {message.content}
          </div>

        </div>

      ))}


      {isLoading && (

        <div className="chat-message chat-message-assistant">

          <div className="message-label">
            Waini Assistant
          </div>

          <div className="assistant-thinking">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      )}

    </div>
  );
}

export default ChatMessages;