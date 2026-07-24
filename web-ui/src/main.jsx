import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import { Layout } from "./layout/layout"
import { SprintScreen } from "@/components/screens/SprintScreen"
import { PracticeScreen } from "@/components/screens/PracticeScreen"
import { LevelsScreen } from "@/components/screens/LevelsScreen"
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen"
import { FeedScreen } from "@/components/screens/FeedScreen"
import { SettingsScreen } from "@/components/screens/SettingsScreen"
import { AboutScreen } from "@/components/screens/AboutScreen"
import { NotFoundScreen } from "@/components/screens/NotFoundScreen"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundScreen />,
    children: [
      { index: true, element: <PracticeScreen /> },
      { path: "practice", element: <PracticeScreen /> },
      { path: "sprint", element: <SprintScreen /> },
      { path: "levels", element: <LevelsScreen /> },
      { path: "leaderboard", element: <LeaderboardScreen /> },
      { path: "feed", element: <FeedScreen /> },
      { path: "settings", element: <SettingsScreen /> },
      { path: "about", element: <AboutScreen /> },
      { path: "*", element: <NotFoundScreen /> },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
