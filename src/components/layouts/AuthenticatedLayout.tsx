import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_SIGN_IN } from '../../const/routes';

const AuthenticatedLayout = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && !isSignedIn) {
    return <Navigate to={ROUTE_SIGN_IN} replace />;
  }

  return <Outlet />;
};

export default AuthenticatedLayout;
