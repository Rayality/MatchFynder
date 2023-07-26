import Root from "./root";
import Login from "./login";
import CreateAccount from "./createAccount";
import PresentOption from "./presentOption";
import Logout from "../Components/views/Logout";
import Layout from "./Layout";
import NewSearch from "./search";
import InviteFriends from "./inviteFriends";
import Home from "../Components/views/home";
import { createBrowserRouter } from "react-router-dom";
import MatchMadePage from "./matchMade";

const domain = /https:\/\/[^/]+/;
const router = createBrowserRouter(
  [
    {
      Component: Layout,
      children: [
        {
          path: "*",
          Component: Root,
        },
        {
          path: "home/",
          Component: Home,
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
          path: "logout/",
          Component: Logout,
        },
        {
          path: "search/",
          Component: NewSearch,
        },
        {
          path: "search/:searchId/",
          Component: InviteFriends,
          // loader: async ({ params }) => {
          //   // Do something to import contact list for user
          // },
        },
        {
          path: "match/:place_id/",
          Component: MatchMadePage,
        },
        {
          path: "search/:searchId/options/",
          Component: PresentOption,
          // loader: async ({ params }) => {},
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL.replace(domain, ""),
  }
);

export { router };
