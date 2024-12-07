import NavBar from './navBarComponents/NavBar';
import Footer from './footerComponents/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      <NavBar />
      <Outlet />
      {location.pathname !== '/map' && <Footer />}
    </div>
  );
};

export default Layout;
