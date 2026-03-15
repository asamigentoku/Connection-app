import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { BulletinBoard } from "./components/bulletin-board";
import { Messages } from "./components/messages";
import { ThreadView } from "./components/thread-view";
import { ConversationView } from "./components/conversation-view";
import { NotFound } from "./components/not-found";
import { Login } from "./components/login";
import { ProtectedRoute } from "./components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: BulletinBoard },
      { path: "board", Component: BulletinBoard },
      { path: "thread/:threadId", Component: ThreadView },
      { path: "messages", Component: Messages },
      { path: "messages/:userId", Component: ConversationView },
      { path: "*", Component: NotFound },
    ],
  },
]);