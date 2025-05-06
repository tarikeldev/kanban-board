import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import Login from "./pages/Auth/login/login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RequireAuth } from "./pages/Auth/RequireAuth.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      return null;
    },
  },
  {
    path: "auth/login",

    element: <Login />,
    loader: () => {
      return null;
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="login" index element={<Login />} />
        </Route>
        <Route
          path="/"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
