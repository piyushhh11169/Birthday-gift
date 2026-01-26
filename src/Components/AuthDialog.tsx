import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginWithSecretKey, clearAuthError } from '../redux/features/auth/auhtSlice';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { status, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [secretKey, setSecretKey] = useState<string>('');

  // Close dialog when authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      setSecretKey('');
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!secretKey.trim()) {
      return;
    }

    await dispatch(loginWithSecretKey(secretKey));
  };

  const handleClose = (): void => {
    // Prevent closing - user must authenticate or use Cancel button
    // Comment out to allow closing
    // setSecretKey('');
    // dispatch(clearAuthError());
    // onClose();
  };

  if (!isOpen) {
    return null;
  }

  const isLoading = status === 'loading';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        // Prevent closing when clicking overlay
        e.stopPropagation();
      }}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-11/12 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Authentication Required
          </h2>
          {/* Remove close button or disable it */}
          {/* <button
            className="text-gray-500 hover:text-gray-800 text-2xl w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClose}
            aria-label="Close dialog"
            disabled={isLoading}
          >
            ✕
          </button> */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="secretKey" 
              className="block mb-2 font-medium text-gray-700"
            >
              Secret Key
            </label>
            <input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSecretKey(e.target.value)
              }
              placeholder="Enter your secret key"
              disabled={isLoading}
              autoFocus
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="bg-red-50 text-red-600 px-3 py-2 rounded-md mb-4 text-sm" 
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            {/* Optional: Keep cancel button but make it less prominent */}
            {/* <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading || !secretKey.trim()}
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Helper text */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          Please authenticate to continue
        </p>
      </div>
    </div>
  );
};

export default AuthDialog;