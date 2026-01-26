import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication?: boolean;
}

/**
 * AuthLayout - Route protection wrapper
 * @param authentication - true = requires auth, false = requires no auth
 * 
 * Examples:
 * <AuthLayout authentication={true}><Home /></AuthLayout>  // Protected route
 * <AuthLayout authentication={false}><Login /></AuthLayout>  // Public only route
 */
export default function AuthLayout({ 
  children, 
  authentication = true 
}: AuthLayoutProps) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // If route requires authentication but user is not authenticated
    if (authentication && !authStatus) {
      navigate('/auth');
    } 
    // If route requires NO authentication (login page) but user IS authenticated
    else if (!authentication && authStatus) {
      navigate('/');
    }
    
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px',
      color: '#666'
    }}>
      Loading...
    </div>
  ) : (
    <div style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}