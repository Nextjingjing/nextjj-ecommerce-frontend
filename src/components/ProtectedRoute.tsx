import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

interface UserAuth {
  roles: { authority: string }[];
  userId: number;
  username: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "ROLE_ADMIN",
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get<UserAuth>("/auth/me");
        const hasRole = response.data.roles.some(
          (r) => r.authority === requiredRole
        );
        setIsAuthorized(hasRole);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, [requiredRole]);

  if (isAuthorized === null) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
