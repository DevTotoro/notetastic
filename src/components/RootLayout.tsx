import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <h2>RootLayout</h2>
      <Outlet />
    </div>
  );
};

export default RootLayout;
