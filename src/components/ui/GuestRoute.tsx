// components/GuestRoute.tsx
import { Navigate } from "react-router-dom";

const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  const tokenExpires = localStorage.getItem("tokenExpires");

  const isTokenValid = (() => {
    if (!token || !tokenExpires) return false;

    const expiresAt = new Date(tokenExpires).getTime();
    return Date.now() < expiresAt;
  })();

  if (isTokenValid) {
    return <Navigate to="/" replace />; // Hoặc "/dashboard" nếu có dashboard riêng
  }

  return <>{children}</>;
};

export default GuestRoute;
