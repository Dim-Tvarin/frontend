import { Outlet } from 'react-router';
import { Header } from './Header';
import Footer from './Footer';
import DialogsManager from 'pages/Layout/DialogsManager';
import { ImageCropProvider } from 'src/context/ImageCropContext';

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ImageCropProvider>
        <DialogsManager />
      </ImageCropProvider>
      <main className="grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
