import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
import useWeboTakStore from "../store/state";

const ShowAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const getAnalysis = useWeboTakStore((state) => state.getAnalysis);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalysis();
      setQuestions(res);
    };

    fetchData();
  }, []);

  return (
    <div className="answers">
      {questions.map(({ id, questionText, answerOptions }) => (
        <div key={id} style={{ width: "100%" }}>
          <h2>{questionText}</h2>

          <Graph data={answerOptions} />
        </div>
      ))}
    </div>
  );
};

export default ShowAnswers;
