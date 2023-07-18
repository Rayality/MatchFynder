import Root from "./root";
import Login from "./login";
import CreateAccount from "./createAccount";
import PresentOption from "./presentOption";
import Logout from "./Components/views/Logout";
import Layout from "./Layout";
import NewSearch from "./search";
import WSTest from "./MeTestWS";
import InviteFriends from "./inviteFriends";
import { createBrowserRouter } from "react-router-dom";
import { useGetOptionsQuery } from "./Redux/optionsApi";

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
        path: "logout/",
        Component: Logout,
      },
      {
        path: "search/",
        Component: NewSearch,
        children: [
          {
            path: ":searchId/",
            Component: InviteFriends,
            loader: async ({ params }) => {
              // Do something to import contact list for user
            },
            children: [
              {
                path: "options/",
                Component: PresentOption,
                loader: async ({ params }) => {
                  const { data } = useGetOptionsQuery(params.searchId);
                  return data;
                },
              },
            ],
          },
        ],
      },
      {
        path: "ws-test/",
        Component: WSTest,
      },
    ],
  },
]);

export { router };
