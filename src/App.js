import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import NextBtn from "./components/NextBtn";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 20;

// SECTION => Initial State
const initialState = {
  questions: [],

  // loading | error | ready | active | finished
  status: "loading",

  // NOTE => Index of the current question
  index: 0,

  // NOTE => Index of the selected answer
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

// SECTION => Reducer function
function reducer(state, action) {
  switch (action.type) {
    // NOTE => Data is ready to be rendered
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    // NOTE => Data failed to load ERROR
    case "dataFailed":
      return { ...state, status: "error" };

    // NOTE => Start the quiz
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    // NOTE => User selected an answer with update the points
    case "newAnswer":
      const question = state.questions.at(state.index);

      const points =
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points;

      return { ...state, answer: action.payload, points };

    // NOTE => Next question
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    // NOTE => Finish the quiz
    case "finished":
      const highScore =
        state.points > state.highScore ? state.points : state.highScore;

      return {
        ...state,
        status: "finished",
        highScore,
      };

    // NOTE => Restart the quiz
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };

    // NOTE => Tick the timer
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  // SECTION => Reducer hook
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // SECTION => Variables [Driven from the state]
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  // SECTION => Fetch questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/RamezKhaled77/react-questions-api/questions"
        );
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              userPoints={points}
              totalQuestionsPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextBtn
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            userPoints={points}
            maxPossiblePoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
