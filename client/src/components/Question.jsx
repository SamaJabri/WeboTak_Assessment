import { useState } from "react";

import Button from "./Button";
import Option from "./Option";

import useWeboTakStore from "../store/state";

const Question = ({ id, questionText, answerOptions, onNext }) => {
  const [activeOptionId, setActiveOptionId] = useState(null);

  const answerQuestion = useWeboTakStore((state) => state.answerQuestion);

  const handleOptionClick = (value) => {
    setActiveOptionId(value);
  };

  const handleQuestionSubmittion = async (e) => {
    e.preventDefault();

    const res = await answerQuestion(id, activeOptionId);
    onNext();
  };

  return (
    <form key={id} className="question" onSubmit={handleQuestionSubmittion}>
      <p>
        <span>Question: </span>
        {questionText.toLowerCase()}?
      </p>

      {answerOptions.map(({ id, answer }) => (
        <Option
          key={id}
          value={answer.toLowerCase()}
          className={`option ${activeOptionId === id ? "option--active" : ""}`}
          onClick={() => handleOptionClick(id)}
        />
      ))}

      <Button text="Next" bgColor="#6A48A1" color="white" type="submit" />
    </form>
  );
};

export default Question;
