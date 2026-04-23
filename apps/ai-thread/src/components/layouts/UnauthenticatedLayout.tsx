import { Outlet } from 'react-router-dom';

const UnauthenticatedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default UnauthenticatedLayout; 