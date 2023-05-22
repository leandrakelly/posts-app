import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const storagedToken = localStorage.getItem('token');
  if (!storagedToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };
