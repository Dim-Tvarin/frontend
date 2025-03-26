import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error from 'pages/Error';
import Main from 'pages/Layout/Main';
import { Home } from 'pages/Home';
import Registration from 'pages/Auth/Registration';
import Components from 'pages/Components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from './redux/users/usersOperations';
import type { AppDispatch } from './redux/store';
import VerifyPage from 'pages/Auth/VerifyPage';
import Announcement from 'pages/Announcement/Announcement';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />

        <Route path="components" element={<Components />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="register" element={<Registration />} />
        <Route path="verify/:verifyToken" element={<VerifyPage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
