import { Outlet } from 'react-router-dom';
import { Footer, Header, Nav } from '../site';

export const SiteLayout = () => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};
