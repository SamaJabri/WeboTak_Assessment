import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import useWeboTakStore from "../store/state";

const Welcome = () => {
  const navigate = useNavigate();

  const addUser = useWeboTakStore((state) => state.addUser);
  const getQuestionsForUser = useWeboTakStore(
    (state) => state.getQuestionsForUser
  );

  const handleNameSubmittion = async (e) => {
    e.preventDefault();

    const { name } = e.target.elements;

    const res = await addUser(name.value);
    const userQuestions = await getQuestionsForUser();
    console.log(userQuestions);
    if (
      res === 201 ||
      (res.response?.status === 409 && userQuestions.length > 0)
    ) {
      navigate("/question");
    } else {
      alert("You answered all questions");
    }
  };

  return (
    <div className="welcome">
      <h2>Help us improve our business and answer a few questions</h2>

      <form className="welcome__name-form" onSubmit={handleNameSubmittion}>
        <label>Please provide a name</label>
        <Input placeholder="Ex: Sama" type="text" name="name" />

        <Button text="Continue" bgColor="#6A48A1" color="white" type="submit" />
      </form>
    </div>
  );
};

export default Welcome;
