import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error from 'pages/Error';
import Main from 'pages/Layout/Main';
import { Home } from 'pages/Home';
import Registration from 'pages/Auth/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from './redux/users/usersOperations';
import type { AppDispatch } from './redux/store';
import VerifyPage from 'pages/Auth/VerifyPage';
import Announcement from 'pages/Announcement/Announcement';
import PetsList from 'pages/PetsList/PetsList';
import PetPage from 'pages/PetPage';
import ProfilePage from 'pages/ProfilePage';
import PrivateRoute from 'components/routes/PrivateRoute';
import EditAnnouncement from 'pages/Announcement/EditAnnouncement';
import { selectToken } from './redux/users/usersSlice';
import FavoritePage from 'pages/FavoritePage';
import { useSyncFavoritesOnLogin } from 'hooks/useSyncFavoritesOnLogin';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(refreshThunk());
    }
  }, [dispatch, token]);
  useSyncFavoritesOnLogin();
  console.log('week-17.1');
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="editannouncement/:id" element={<EditAnnouncement />} />
        <Route path="allpets" element={<PetsList />} />
        <Route path="allpets/:id" element={<PetPage />} />
        <Route path="favorite" element={<FavoritePage />} />
        <Route
          path="profile"
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
