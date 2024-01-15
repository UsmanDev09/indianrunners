import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children } : { children: React.ReactNode }) => {
  const router = useRouter();

  const isAuthenticated = localStorage.getItem('token') ? true : false;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default ProtectedRoute;

