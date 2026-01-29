import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginWithSecretKey } from '../redux/features/auth/auhtSlice';
import styles from '../assets/css/AuthPage.module.css';

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [secretKey, setSecretKey] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!secretKey.trim()) return;

    await dispatch(loginWithSecretKey(secretKey));
  };

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        {/* Card/Dialog Box */}
        <div className={styles.card}>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className={styles.title}>Unlock your Digital Gift!</h1>
            <p className={styles.subtitle}>Enter your secret key</p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Input */}
            <div className={styles.inputGroup}>
              <input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Secret Key"
                autoComplete="off"
                autoFocus
                disabled={isLoading}
                aria-invalid={!!error}
                aria-describedby={error ? 'auth-error' : undefined}
                className={styles.input}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                id="auth-error"
                role="alert"
                aria-live="polite"
                className={`${styles.error} ${styles.shake}`}
              >
                <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !secretKey.trim()}
              aria-busy={isLoading}
              aria-disabled={isLoading}
              className={styles.button}
            >
              {isLoading ? (
                <span className={styles.buttonContent}>
                  <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Unlocking...
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className={styles.footer}>
          Don't have a key? Contact your administrator
        </p>
      </section>
    </main>
  );
};

export default AuthPage;