import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
import useWeboTakStore from "../store/state";
import Button from "../components/Button";

const ShowAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const getAnalysis = useWeboTakStore((state) => state.getAnalysis);
  const deleteQuestion = useWeboTakStore((state) => state.deleteQuestion);

  const handleQuestionDeletion = async (id) => {
    const res = await deleteQuestion(id);

    fetchData();
  };

  const fetchData = async () => {
    const res = await getAnalysis();
    setQuestions(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="answers">
      {questions.map(({ id, questionText, answerOptions }) => (
        <div key={id} style={{ width: "100%" }}>
          <div className="answers__header">
            <h2>{questionText.toLowerCase()}</h2>
            <Button
              text="Delete"
              type="text"
              bgColor="#A42828"
              color="white"
              onClick={() => handleQuestionDeletion(id)}
            />
          </div>

          <Graph data={answerOptions} />
        </div>
      ))}
    </div>
  );
};

export default ShowAnswers;
