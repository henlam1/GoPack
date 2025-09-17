import { Link } from 'react-router-dom';
import publicRoutes from '../../routes/publicRoutes';
import { useAuth } from '../../hooks/useAuth';
import ThemeButton from '../buttons/ThemeButton';

export default function Navbar({ privacy = 'public' }) {
  const { logout } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost text-xl">
          GoPack!
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {privacy == 'public' && (
            <li>
              <Link to={publicRoutes.login}>Login</Link>
            </li>
          )}
          {privacy == 'public' && (
            <li>
              <Link to={publicRoutes.register}>Register</Link>
            </li>
          )}
          {privacy != 'public' && (
            <li>
              <Link
                to={publicRoutes.home}
                onClick={async () => {
                  await logout();
                }}
              >
                Logout
              </Link>
            </li>
          )}
          <li>
            <ThemeButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
