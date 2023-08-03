import Input from "../components/Input";
import Button from "../components/Button";

import { useNavigate } from "react-router-dom";

import useWeboTakStore from "../store/state";

const Welcome = () => {
  const navigate = useNavigate();

  const addUser = useWeboTakStore((state) => state.addUser);

  const handleNameSubmittion = async (e) => {
    e.preventDefault();

    const { name } = e.target.elements;

    const res = await addUser(name.value);

    res.status === 201
      ? navigate("/question")
      : alert("You answered all questions");
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
