import { useEffect, useState } from "react";
import Question from "../components/Question";
import useWeboTakStore from "../store/state";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //const questions = useWeboTakStore((state) => state.questions);
  const getQuestionsForUser = useWeboTakStore(
    (state) => state.getQuestionsForUser
  );
  /*   const questions = [
    {
      id: 0,
      questionText: "Which vegetable do you prefer",
      answerOptions: ["Lattuce", "Cucumber", "Tomatoes"],
    },
  ]; */

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex + 1 >= questions.length ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestionsForUser();
      setQuestions(res);
    };

    fetchData();
    //console.log(questions[currentQuestionIndex]);
  }, []);

  return (
    <div className="questions">
      <div className="question__counter"></div>
      {questions.length > 0 ? (
        <Question
          id={questions[currentQuestionIndex].id}
          questionText={questions[currentQuestionIndex].questionText}
          answerOptions={questions[currentQuestionIndex].answerOptions}
          onNext={handleNextQuestion}
        />
      ) : (
        <h1>You answered all questions</h1>
      )}
    </div>
  );
};

export default Questions;
