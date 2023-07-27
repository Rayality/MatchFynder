import Login from "./login";
import CreateAccount from "./createAccount";
import PresentOption from "./presentOption";
import Layout from "./Layout";
import NewSearch from "./search";
import InviteFriends from "./inviteFriends";
import Home from "../Components/views/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MatchMadePage from "./matchMade";
import { useAuth } from "../Components/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const { token } = useAuth();
  const publicRoutes = [
    {
      path: "/",
      Component: Home,
    },
  ];
  const authRoutes = [
    {
      path: "*",
      Component: ProtectedRoute,
      children: [
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
          path: "search/:searchId/options/",
          Component: PresentOption,
          // loader: async ({ params }) => {},
        },
        {
          path: "match/:place_id",
          Component: MatchMadePage,
        },
      ],
    },
  ];
  const nonAuthRoutes = [
    {
      path: "/",
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
  ];
  const router = createBrowserRouter([
    {
      Component: Layout,
      path: "/",
      children: [
        ...publicRoutes,
        ...(!token ? nonAuthRoutes : []),
        ...authRoutes,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
