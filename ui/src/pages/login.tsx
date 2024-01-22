import { useAdminGetSession } from 'medusa-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/organisms/login-card';
import ResetTokenCard from '../components/organisms/reset-token-card';
import SEO from '../components/seo';
import PublicLayout from '../components/templates/login-layout';

const LoginPage = () => {
  const [resetPassword, setResetPassword] = useState(false);

  const { user } = useAdminGetSession();

  const navigate = useNavigate();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (window.location.search.includes('reset-password')) {
      setResetPassword(true);
    }
  }, []);

  const showLogin = () => {
    setResetPassword(false);
    navigate('/login', { replace: true });
  };

  const showResetPassword = () => {
    setResetPassword(true);
  };

  return (
    <PublicLayout>
      <SEO title='Login' />
      {resetPassword ? (
        <ResetTokenCard goBack={showLogin} />
      ) : (
        <LoginCard toResetPassword={showResetPassword} />
      )}
      <a
        type='button'
        onClick={() => navigate('/store/auth/google', { replace: true })}
        className='google-signin-button'
      >
        <svg
          className='google-icon'
          aria-hidden='true'
          focusable='false'
          data-prefix='fab'
          data-icon='google'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 488 512'
        >
          <path
            fill='currentColor'
            d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
          ></path>
        </svg>
        Sign in with Google
      </a>
    </PublicLayout>
  );
};

export default LoginPage;
