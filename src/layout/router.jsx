// src/router.tsx
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Navbar & Footer stay mounted here
    children: [
     
    ],
  },
]);