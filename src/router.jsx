import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "@/components/organisms/auth/private-route";
import Layout from "@/components/layouts/layout";

import ErrorScreen from "@/pages/error-screen";
import GuestRoute from "./components/organisms/auth/guest-route";
import Login from "./pages/auth/login";
import Boards from "./pages/board";
import BoardDetail from "./pages/board/board-detail";
import Home from "./pages/home";
import Register from "./pages/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorScreen />,
    element: <PrivateRoute element={Layout} />,
    children: [
      { path: "", element: <Boards /> },
      { path: "/boards/:id", element: <BoardDetail /> },
    ],
  },

  { path: "/home", element: <Home /> },
  { path: "/login", element: <GuestRoute element={Login} /> },
  { path: "/register", element: <GuestRoute element={Register} /> },
  { path: "/unauthorized", element: <ErrorScreen code={401} /> },
  { path: "*", element: <ErrorScreen code={404} /> },
]);

export default router;
