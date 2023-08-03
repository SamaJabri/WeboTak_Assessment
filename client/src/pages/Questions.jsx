import { useEffect, useState } from "react";
import Question from "../components/Question";
import useWeboTakStore from "../store/state";
import Button from "../components/Button";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
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

  const fetchData = async () => {
    const res = await getQuestionsForUser();
    setQuestions(res);
    console.log(res);
  };

  useEffect(() => {
    fetchData();
    console.log(fetchData());
  }, []);

  return (
    <div className="questions">
      <div className="question__counter"></div>
      {questions.length > 0 ? (
        <Question
          id={questions[0].id}
          questionText={questions[0].questionText}
          answerOptions={questions[0].answerOptions}
          onNext={fetchData}
        />
      ) : (
        <div className="questions__end">
          <h1>You answered all questions</h1>
          <Button text="Home" bgColor="#6A48A1" color="white" navigateTo="/" />
        </div>
      )}
    </div>
  );
};

export default Questions;

/*questions.length > 0 ? (
        questions.map(({ id, questionText, answerOptions }) => (
          <Question
            key={id}
            id={id}
            questionText={questionText}
            answerOptions={answerOptions}
          />
        )) */
