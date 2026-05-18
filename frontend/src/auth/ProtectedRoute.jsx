// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { 
  selectCurrentUser, 
  selectIsAuthenticated,
  selectAuthLoading
} from '../redux/features/authSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

const ProtectedRoute = ({ roles = [] }) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;