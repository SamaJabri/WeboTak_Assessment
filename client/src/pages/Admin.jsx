import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import Button from "../components/Button";

const Admin = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  return (
    <div className="admin">
      <div className="admin__options">
        <Button
          text="Add Question"
          type="text"
          navigateTo={"add"}
          onClick={() => handleButtonClick("Add")}
          bgColor={activeButton === "Add" ? "#515151" : "transparent"}
          color="white"
        />
        <Button
          text="Show Results"
          type="text"
          navigateTo={"show"}
          onClick={() => handleButtonClick("Show")}
          bgColor={activeButton === "Show" ? "#515151" : "transparent"}
          color="white"
        />
      </div>

      <Outlet />
    </div>
  );
};

export default Admin;
