import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (user?.role === 'patient') return '/patient/dashboard';
    if (user?.role === 'provider') return '/provider/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/login';
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Community Healthcare System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connecting patients with healthcare providers for better community health
        </p>

        {isAuthenticated ? (
          <Link
            to={getDashboardLink()}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">For Patients</h3>
          <p className="text-gray-600">
            Search for healthcare providers, book appointments, and manage your health visits all in one place.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">For Providers</h3>
          <p className="text-gray-600">
            Manage your availability, accept bookings, and maintain patient records efficiently.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Simple</h3>
          <p className="text-gray-600">
            Built with security and ease of use in mind, making healthcare access simpler for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
