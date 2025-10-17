import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (user?.role === 'patient') return '/patient/dashboard';
    if (user?.role === 'provider') return '/provider/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Community Healthcare
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="hover:text-blue-200">
                  Dashboard
                </Link>
                <span className="text-sm">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;