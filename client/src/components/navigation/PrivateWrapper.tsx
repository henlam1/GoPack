import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PrivateLayout from "./PrivateLayout";
import Loading from "../feedback/Loading";

export default function PrivateWrapper() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" />;
}
