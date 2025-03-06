import { Navigate } from "react-router-dom";
import PrivateLayout from "./PrivateLayout";

export default function PrivateWrapper() {
  const auth = true;
  return auth ? <PrivateLayout /> : <Navigate to="/login" />;
}
