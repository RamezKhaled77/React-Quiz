function NextBtn({ dispatch, answer, index, numQuestions }) {
  // NOTE => Check if there is no answer
  if (answer === null) return;

  // NOTE => Check if the user in the questions number range
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  // NOTE => Check if the user is on the last question
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextBtn;
