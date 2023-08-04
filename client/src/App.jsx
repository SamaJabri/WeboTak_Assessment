import { RouterProvider } from "react-router-dom";

import Routes from "./routes/Route";

import "./App.css";

function App() {
  return <RouterProvider router={Routes} />;
}

export default App;
