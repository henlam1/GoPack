import { useNavigate } from 'react-router-dom';
import publicRoutes from '../../routes/publicRoutes';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">GoPack!</h1>
          <p className="py-6">
            Packing for your next trip will be easier than ever.
          </p>
          <button
            onClick={() => navigate(publicRoutes.register)}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
