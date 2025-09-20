import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../../../features/authentication/useUser";
import Spinner from "../Spinners/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser)
    return (
      <div className="flex justify-center items-center bg-[var(--color-grey-50)] h-screen">
        <Spinner />
      </div>
    );

  if (!user?.isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
