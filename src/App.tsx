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
import PetsList from 'pages/PetsList';
import PetPage from 'pages/PetPage';
import ProfilePage from 'pages/ProfilePage';
import PrivateRoute from 'components/routes/PrivateRoute';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  console.log('week-10.1');
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />

        <Route path="components" element={<Components />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="allpets" element={<PetsList />} />
        <Route path="allpets/:id" element={<PetPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="register" element={<Registration />} />
        <Route path="verify/:verifyToken" element={<VerifyPage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
