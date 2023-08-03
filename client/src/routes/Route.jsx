import { createBrowserRouter } from "react-router-dom";

import Welcome from "../pages/Welcome";
import Questions from "../pages/Questions";
import AddQuestion from "../pages/AddQuestion";
import ShowAnswers from "../pages/ShowAnswers";
import Admin from "../pages/Admin";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/question",
    element: <Questions />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "add",
        element: <AddQuestion />,
      },
      {
        path: "show",
        element: <ShowAnswers />,
      },
    ],
  },
]);

export default Routes;
