import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { checkAuthSession } from '../redux/features/auth/auhtSlice';

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean; // true = requires auth, false = public route
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authentication }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const initAuth = async () => {
      await dispatch(checkAuthSession());
      setIsChecking(false);
    };

    initAuth();
  }, [dispatch]);

  useEffect(() => {
    // Don't redirect while checking session
    if (isChecking || status === 'loading') {
      return;
    }

    if (authentication) {
      // Protected route - requires authentication
      if (!isAuthenticated) {
        navigate('/auth');
      }
    } else {
      // Public route (auth page) - redirect if already authenticated
      if (isAuthenticated) {
        navigate('/');
      }
    }
  }, [isAuthenticated, authentication, navigate, isChecking, status]);

  // Show loading while checking session
  if (isChecking || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;