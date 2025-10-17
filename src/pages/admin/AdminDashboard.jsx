import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Admin Dashboard - Welcome, {user.name}!
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/approve-providers"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Approve Providers
          </h3>
          <p className="text-gray-600">
            Review and approve pending provider registrations
          </p>
        </Link>

        <Link
          to="/admin/specialties"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Manage Specialties
          </h3>
          <p className="text-gray-600">
            Add, edit, or remove medical specialties
          </p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Pending Approvals
          </h3>
          <p className="text-gray-600">No pending provider approvals</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Total Providers
          </h3>
          <p className="text-gray-600">0 active providers</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Total Patients
          </h3>
          <p className="text-gray-600">0 registered patients</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            System Health
          </h3>
          <p className="text-green-600">All systems operational</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
