import { selectIsLoggedIn } from '../redux/users/usersSlice';
import { selectFavoriteIds } from '../redux/animals/favoriteAnimalsSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAddFavoriteAnimalMutation } from '../redux/animals/animalsApi';

export const useSyncFavoritesOnLogin = () => {
  const favoriteIds = useSelector(selectFavoriteIds);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [addFavorite] = useAddFavoriteAnimalMutation();

  useEffect(() => {
    const sync = async () => {
      if (isLoggedIn && favoriteIds.length > 0) {
        for (const id of favoriteIds) {
          try {
            await addFavorite(id).unwrap();
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    sync();
  }, [isLoggedIn]);
};
