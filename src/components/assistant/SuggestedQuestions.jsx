const questions = [
  "What wines do you recommend for a beginner?",
  "What red wines are available at Waini?",
  "What wines can I buy for under ₦20,000?",
  "What wine pairs well with steak?",
  "What is the difference between red and white wine?",
  "How does delivery work at Waini?"
];

function SuggestedQuestions({
  onQuestionClick,
  disabled
}) {
  return (
    <div className="suggested-questions">

      {questions.map((question, index) => (

        <button
          key={index}
          className="suggested-question"
          onClick={() =>
            onQuestionClick(question)
          }
          disabled={disabled}
        >
          <span className="suggested-number">
            0{index + 1}
          </span>

          <span>
            {question}
          </span>

          <span className="suggested-arrow">
            ↗
          </span>
        </button>

      ))}

    </div>
  );
}

export default SuggestedQuestions;