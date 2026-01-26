import React, { useState } from 'react';
import AuthDialog from '../Components/AuthDialog';

/**
 * AuthPage - Login/Authentication page
 * AuthLayout wrapper handles redirection to home after successful authentication
 */
const AuthPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

  const handleCloseDialog = (): void => {
    // Prevent closing - user must authenticate
    // Only close dialog on successful login (handled in AuthDialog)
    return;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 flex justify-center items-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          🔐 Authentication Required
        </h1>
        
        <p className="text-gray-600 text-base mb-8 leading-relaxed">
          Please enter your secret key to access the application. After successful authentication, you'll be redirected to the home page.
        </p>

        <div className="p-5 bg-gray-50 rounded-lg mb-5">
          <p className="m-0 text-gray-600 text-sm">
            <strong>Test Credentials:</strong><br />
            DEV_SECRET_123<br />
            ADMIN_SECRET_456
          </p>
        </div>
      </div>

      <AuthDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};

export default AuthPage;