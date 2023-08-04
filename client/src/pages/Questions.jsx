import { useEffect, useState } from "react";

import Question from "../components/Question";
import Button from "../components/Button";

import useWeboTakStore from "../store/state";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const getQuestionsForUser = useWeboTakStore(
    (state) => state.getQuestionsForUser
  );

  const fetchData = async () => {
    const res = await getQuestionsForUser();
    setQuestions(res);
  };

  useEffect(() => {
    fetchData();
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
