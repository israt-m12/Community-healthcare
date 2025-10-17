import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProviderDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Provider Dashboard - Welcome, {user.name}!
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/provider/availability"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Manage Availability
          </h3>
          <p className="text-gray-600">
            Set and update your available time slots
          </p>
        </Link>

        <Link
          to="/provider/bookings"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Manage Bookings
          </h3>
          <p className="text-gray-600">
            Accept or decline appointment requests
          </p>
        </Link>

        <Link
          to="/provider/profile"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            My Profile
          </h3>
          <p className="text-gray-600">
            Update your profile and specialty information
          </p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Pending Requests
          </h3>
          <p className="text-gray-600">No pending appointment requests</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Today's Appointments
          </h3>
          <p className="text-gray-600">No appointments scheduled for today</p>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
