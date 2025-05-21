import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAddFavoriteAnimalMutation } from '../redux/animals/animalsApi';
import { selectFavoriteIds } from '../redux/animals/favoriteAnimalsSlice';
import { selectIsLoggedIn } from '../redux/users/usersSlice';

export const useSyncFavoritesOnLogin = () => {
  const favoriteIds = useSelector(selectFavoriteIds);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [addFavorite] = useAddFavoriteAnimalMutation();

  const hasSyncedRef = useRef(false);
  const wasLoggedInRef = useRef(false);

  useEffect(() => {
    if (!wasLoggedInRef.current && isLoggedIn && !hasSyncedRef.current) {
      (async () => {
        for (const id of favoriteIds) {
          try {
            await addFavorite(id).unwrap();
          } catch (error) {
            console.error(error);
          }
        }
        hasSyncedRef.current = true;
      })();
    }

    wasLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn, favoriteIds, addFavorite]);
};
