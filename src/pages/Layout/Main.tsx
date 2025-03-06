import { Outlet } from 'react-router';
import { Header } from './Header';
import Footer from './Footer';

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
