import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PrivateLayout from './PrivateLayout';
import Loading from '../feedback/Loading';

export default function PrivateWrapper() {
  const { hydrationStatus, isAuthenticated } = useAuth();
  console.log(
    `hydrationStatus: ${hydrationStatus}, isAuthenticated: ${isAuthenticated}`,
  );
  if (hydrationStatus === 'idle' || hydrationStatus === 'hydrating')
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  if (hydrationStatus === 'disabled' || !isAuthenticated)
    return <Navigate to="/login" />;
  return <PrivateLayout />;
}
