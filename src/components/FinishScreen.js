function FinishScreen({ userPoints, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (userPoints / maxPossiblePoints) * 100;

  let emoji;

  // NOTE => Emoji
  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "🥇";
  if (percentage >= 50 && percentage < 80) emoji = "🥈";
  if (percentage >= 0 && percentage < 50) emoji = "🥉";
  if (percentage === 0) emoji = "😥";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{userPoints}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>

      <p className="high-score">(High Score: {highScore} Point)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
