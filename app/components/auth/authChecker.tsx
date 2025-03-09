import { Navigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

interface PrivateRouteProps {
 readonly children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps): React.ReactElement {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}