import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn === true ? children : <Navigate to="/auth/login" replace />;
}
