function Progress({
  numQuestions,
  index,
  userPoints,
  totalQuestionsPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{userPoints}</strong>/{totalQuestionsPoints} Points
      </p>
    </header>
  );
}

export default Progress;
