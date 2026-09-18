const questions = [
  "What wines do you recommend for a beginner?",
  "What red wines are available at Winova?",
  "What wines can I buy for under ₦20,000?",
  "What wine pairs well with steak?",
  "What is the difference between red and white wine?",
  "How does delivery work at Winova?"
];

function SuggestedQuestions({ onQuestionClick }) {
  return (
    <div className="suggested-questions">

      <p>Try asking:</p>

      <div className="suggested-questions-grid">

        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() =>
              onQuestionClick(question)
            }
          >
            {question}
          </button>
        ))}

      </div>

    </div>
  );
}

export default SuggestedQuestions;