import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import { Layout } from "./layout/layout" 

// 1. Mock pages (Replace these with imports from your own /pages directory)
const Home = () => <h1 className="text-2xl font-bold">Home Page Content</h1>
const About = () => <h1 className="text-2xl font-bold">About Page Content</h1>
const Dashboard = () => <h1 className="text-2xl font-bold">Dashboard Page Content</h1>
const NotFound = () => <h1 className="text-2xl font-bold text-destructive">404 - Page Not Found</h1>

// 2. Define the route structure matrix
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wraps all inner items below
    children: [
      { index: true, element: <Home /> },           // Matches exact "/" path
      { path: "about", element: <About /> },         // Matches "/about" path
      { path: "dashboard", element: <Dashboard /> }, // Matches "/dashboard" path
      { path: "*", element: <NotFound /> }           // Catches all broken links
    ]
  }
])

// 3. Mount into the DOM tree
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
