import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logoutUser } from '../redux/features/auth/auhtSlice';

/**
 * Home - Protected home page
 * Only accessible to authenticated users
 */
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/auth', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 flex justify-center items-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          🎉 Welcome Home!
        </h1>
        
        <p className="text-gray-600 text-base mb-8">
          You have successfully authenticated and accessed the protected home page.
        </p>

        <div className="bg-gray-50 p-5 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Information
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-2">
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Email:</strong> {user?.email || 'Anonymous'}</p>
            <p><strong>Created At:</strong> {user?.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}</p>
            <p><strong>Authentication Method:</strong> Secret Key</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-red-700 transition-colors"
          >
            Logout
          </button>

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-800 text-sm m-0">
            💡 <strong>Tip:</strong> This page is protected. Unauthenticated users will be automatically redirected to /auth
          </p>
        </div>
      </div>
    </div>
  );
};