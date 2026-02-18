import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvide";
import type { JSX } from "react";

type Props = {
  children?: JSX.Element;
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, loading } = useAuth();
  // ⏳ wait until auth is loaded
  if (loading) return null; // or spinner

  // 🔒 not authenticated
  if (!user ) {
    return <Navigate to="/" replace />;
  }

  // 🚫 role not allowed
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    const roleRedirectMap: Record<string, string> = {
      admin: "/admin/dashboard",
      nurse: "/user/dashboard",
     
    };

    return (
      <Navigate
        to={roleRedirectMap[user.userType] || "/"}
        replace
      />
    );
  }

  return children;
}
