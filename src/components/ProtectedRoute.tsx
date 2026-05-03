import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('client' | 'staff' | 'admin')[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
console.log('ProtectedRoute user:', user);
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Determine user type from roles array
let userType: 'client' | 'staff' | 'admin' = 'client';
if (user.roles && user.roles.length > 0) {
  const roles = user.roles.map(r => r.role);
  if (roles.includes('admin')) userType = 'admin';
  else if (roles.includes('staff')) userType = 'staff';
} else {
  // Fallback using boolean flags
  if (user.is_superuser || user.is_staff) {
    userType = 'admin';
  } else if (user.is_staff_member) {
    userType = 'staff';
  }
}

  if (allowedRoles && !allowedRoles.includes(userType)) {
    // Redirect to the appropriate dashboard
    if (userType === 'admin') return <Navigate to="/admin" replace />;
    if (userType === 'staff') return <Navigate to="/staff" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};