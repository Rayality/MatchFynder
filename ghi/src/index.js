import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/login";
import CreateAccount from "./routes/createAccount";
import PresentOption from "./routes/presentOption";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Logout from "./Components/views/Logout";
import Layout from "./routes/Layout";
import NewSearch from "./routes/search";
import MatchMadePage from "./routes/matchMade";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "*",
        Component: Root,
      },
      {
        path: "login/",
        Component: Login,
      },
      {
        path: "signup/",
        Component: CreateAccount,
      },
      {
        path: "options/",
        Component: PresentOption,
      },
      {
        path: "logout/",
        Component: Logout,
      },
      {
        path: "search/",
        Component: NewSearch,
      },
      {
        path: "match/:place_id/",
        Component: MatchMadePage,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
