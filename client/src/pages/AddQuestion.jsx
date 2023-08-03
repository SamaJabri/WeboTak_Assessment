import { useEffect, useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";

import useWeboTakStore from "../store/state";

const AddQuestion = () => {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);

  const checkDuplicateQuestion = useWeboTakStore(
    (state) => state.checkDuplicateQuestion
  );
  const addQuestion = useWeboTakStore((state) => state.addQuestion);

  const handleQuestionAddition = async (e) => {
    e.preventDefault();

    const { question } = e.target.elements;

    const res = await checkDuplicateQuestion(question.value);

    if (res.response?.status === 409) {
      alert("You already added this question");
    } else {
      setQuestion(question.value);
    }

    e.target.reset();
  };

  const handleOptionAddition = (e) => {
    e.preventDefault();

    const { option } = e.target.elements;

    setOptions([...options, option.value]);

    e.target.reset();
  };

  const handleOptionDeletion = (choosenOption) => {
    setOptions(options.filter((option) => option !== choosenOption));
  };

  const handleQuestionSubmittion = async () => {
    console.log(question, options);
    const res = await addQuestion(question, options);
    res.status === 200
      ? alert("Question added successfully")
      : alert("Something went wrong, please try again");

    setQuestion("");
    setOptions([]);
  };

  useEffect(() => {}, [options, question]);

  return (
    <div className="add-question">
      <div className="add-question__inputs">
        <form
          className="add-question__question"
          onSubmit={handleQuestionAddition}
        >
          <label htmlFor="question">Question</label>
          <Input type="text" name="question" />

          <Button text="Add" type="submit" bgColor="#6A48A1" color="white" />
        </form>

        <form className="add-question__option" onSubmit={handleOptionAddition}>
          <label htmlFor="option">Option</label>
          <Input type="text" name="option" />

          <Button
            text="Add Option"
            type="submit"
            bgColor="#6A48A1"
            color="white"
          />
        </form>
      </div>

      <div className="preview">
        <div className="preview__question">
          <h3>Question</h3>
          <p>{question}</p>
        </div>

        <div className="preview__options">
          <h3>Options</h3>
          <ol className="preview__options-list">
            {options.map((option, index) => (
              <li key={index} className="preview__option">
                {option}
                <Button
                  text="Delete"
                  type="text"
                  bgColor="#A42828"
                  color="white"
                  onClick={() => handleOptionDeletion(option)}
                />
              </li>
            ))}
          </ol>
        </div>

        <Button
          text="Submit Question"
          type="text"
          bgColor="#6A48A1"
          color="white"
          onClick={handleQuestionSubmittion}
        />
      </div>
    </div>
  );
};

export default AddQuestion;
