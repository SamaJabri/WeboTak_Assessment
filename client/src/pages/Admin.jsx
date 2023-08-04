import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Button from "../components/Button";

import useWeboTakStore from "../store/state";

const Admin = () => {
  const [activeButton, setActiveButton] = useState();

  const adminPage = useWeboTakStore((state) => state.adminPage);
  const setAdminPage = useWeboTakStore((state) => state.setAdminPage);

  const handleButtonClick = (value) => {
    setActiveButton(value);
    setAdminPage(value);
  };

  useEffect(() => {}, [activeButton, setAdminPage]);

  return (
    <div className="admin">
      <div className="admin__options">
        <Button
          text="Add Question"
          type="text"
          navigateTo={"add"}
          onClick={() => handleButtonClick("Add")}
          bgColor={adminPage === "Add" ? "#515151" : "transparent"}
          color="white"
        />
        <Button
          text="Show Results"
          type="text"
          navigateTo={"show"}
          onClick={() => handleButtonClick("Show")}
          bgColor={adminPage === "Show" ? "#515151" : "transparent"}
          color="white"
        />
      </div>

      <Outlet />
    </div>
  );
};

export default Admin;
