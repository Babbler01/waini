function ChatMessages({
  messages,
  isLoading
}) {

  return (
    <div className="chat-messages">

      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.role}`}
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
            <div className="chat-message assistant">

                <div className="message-label">
                Waini Assistant
                </div>

                <div className="message-content">
                Thinking...
                </div>

            </div>
        )}

    </div>
  );
}

export default ChatMessages;