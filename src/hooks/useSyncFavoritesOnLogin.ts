import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddFavoriteAnimalMutation,
  useLazyGetAnimalByIdQuery,
} from '../redux/animals/animalsApi';
import {
  removeAnimal,
  selectFavoriteIds,
} from '../redux/animals/favoriteAnimalsSlice';
import { selectIsLoggedIn } from '../redux/users/usersSlice';

export const useSyncFavoritesOnLogin = () => {
  const favoriteIds = useSelector(selectFavoriteIds);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [addFavorite] = useAddFavoriteAnimalMutation();
  const [triggerGetAnimalById] = useLazyGetAnimalByIdQuery();
  const dispatch = useDispatch();

  const hasSyncedRef = useRef(false);
  const wasLoggedInRef = useRef(false);

  useEffect(() => {
    if (!wasLoggedInRef.current && !hasSyncedRef.current) {
      (async () => {
        const validIds: string[] = [];

        for (const id of favoriteIds) {
          try {
            const res = await triggerGetAnimalById(id).unwrap();

            if (
              !res ||
              res.animal.status === 'inactive' ||
              res.animal.isHidden
            ) {
              throw new Error('Not found or hidden');
            }

            validIds.push(id);
          } catch (error) {
            dispatch(removeAnimal(id));
          }
        }

        if (validIds.length > 0) {
          localStorage.setItem('favorites', JSON.stringify(validIds));
        } else {
          localStorage.removeItem('favorites');
        }

        if (isLoggedIn) {
          for (const id of validIds) {
            try {
              await addFavorite(id).unwrap();
            } catch {
  localStorage.removeItem('favorites');
          }
        }

        hasSyncedRef.current = true;
      })();
    }

    wasLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn, favoriteIds, addFavorite, triggerGetAnimalById, dispatch]);
};
