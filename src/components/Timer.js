import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  // NOTE => Format the time
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${mins < 10 ? "0" : ""}${mins}:${
    secs < 10 ? "0" : ""
  }${secs}`;

  // NOTE => Tick the timer
  useEffect(() => {
    let interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return <div className="timer">{formattedTime}</div>;
}

export default Timer;
