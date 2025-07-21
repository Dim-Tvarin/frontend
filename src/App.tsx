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
import PetPage from 'pages/PetPage';
import PrivateRoute from 'components/routes/PrivateRoute';
import EditAnnouncement from 'pages/Announcement/EditAnnouncement';
import { selectToken, selectUserTheme } from './redux/users/usersSlice';
import FavoritePage from 'pages/FavoritePage';
import { useSyncFavoritesOnLogin } from 'hooks/useSyncFavoritesOnLogin';
import BlogMain from 'pages/Blog/BlogMain';
import Article1 from 'pages/Blog/Article1';
import Article2 from 'pages/Blog/Article2';
import Article3 from 'pages/Blog/Article3';
import Article4 from 'pages/Blog/Article4';
import Article5 from 'pages/Blog/Article5';
import Article6 from 'pages/Blog/Article6';
import PrivacyPolicyPage from 'pages/PrivacyPolicyPage';
import ProfileLayout from 'pages/ProfileLayout';
import PetsPage from 'pages/PetsList/PetsPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const theme = useSelector(selectUserTheme);
  useEffect(() => {
    if (token) {
      dispatch(refreshThunk());
    }
  }, [dispatch, token]);
  useEffect(() => {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);
  useSyncFavoritesOnLogin();
  console.log('week-24');
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="announcement" element={<Announcement />} />
        <Route
          path="editannouncement/:id"
          element={
            <PrivateRoute>
              <EditAnnouncement />
            </PrivateRoute>
          }
        />
        <Route path="allpets" element={<PetsPage />} />
        <Route path="allpets/:id" element={<PetPage />} />
        <Route path="favorite" element={<FavoritePage />} />

        <Route path="blog" element={<BlogMain />} />
        <Route
          path="blog/porady-shchodo-vyboru-tvaryny"
          element={<Article1 />}
        />
        <Route path="blog/adaptatsiya-do-novoho-domu" element={<Article2 />} />
        <Route path="blog/osoblyvosti-zdorovya" element={<Article3 />} />
        <Route
          path="blog/stvoryennya-zdorovoho-seredovyshcha-dlya-uliublentsya"
          element={<Article4 />}
        />
        <Route path="blog/test-znajdy-zvira" element={<Article5 />} />
        <Route
          path="blog/yak-tvaryny-zminyuyut-zhyttya"
          element={<Article6 />}
        />

        <Route
          path="profile/info"
          element={
            <PrivateRoute>
              <ProfileLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="profile/ads"
          element={
            <PrivateRoute>
              <ProfileLayout />
            </PrivateRoute>
          }
        />
        <Route path="profile/*" element={<Error />} />

        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="register" element={<Registration />} />
        <Route path="verify/:verifyToken" element={<VerifyPage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
