import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./layout/layout";
import "./index.css";

const Home = () => <h1 className="text-2xl font-bold">Home Page Content</h1>;
const About = () => <h1 className="text-2xl font-bold">About Page Content</h1>;
const Dashboard = () => (
  <h1 className="text-2xl font-bold">Dashboard Page Content</h1>
);
const NotFound = () => (
  <h1 className="text-2xl font-bold text-destructive">404 - Page Not Found</h1>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// 3. Mount into the DOM tree
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
