const questions = [
  "Recommend a wine for a beginner",
  "Show me wines under ₦20,000",
  "What wine pairs well with steak?",
  "How does delivery work?"
];

function SuggestedQuestions({
  onQuestionClick,
  disabled
}) {
  return (
    <div className="sidebar-questions">

      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(question)}
          disabled={disabled}
          className="sidebar-question"
        >
          <span>{question}</span>

          <span className="question-arrow">
            →
          </span>
        </button>
      ))}

    </div>
  );
}

export default SuggestedQuestions;