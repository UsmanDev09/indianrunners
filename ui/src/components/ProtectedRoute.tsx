import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children } : { children: React.ReactNode }) => {
  const router = useRouter();

  const isAuthenticated = Cookies.get('token') ? true : false;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default ProtectedRoute;

