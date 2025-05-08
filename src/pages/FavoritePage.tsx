import AnimalCard from 'components/AnimalCard';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import { useSelector } from 'react-redux';
import {
  selectFavoriteAnimals,
  selectFavoritesLoading,
} from 'src/redux/animals/favoriteAnimalsSlice';

const FavoritePage = () => {
  const isLoading = useSelector(selectFavoritesLoading);
  const favorites = useSelector(selectFavoriteAnimals);

  return (
    <div className="container">
      <div className="relative text-center mt-100 mb-50">
        <h1 className="text-[32px] text-default-btn w-full">Обрані</h1>
        {favorites.length === 0 && (
          <p className="text-lg text-default-btn ">Поки немає обраних</p>
        )}
      </div>

      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <div className="flex gap-20">
          <div className="grid gap-20 mb-50 wrap transition-all duration-500 grid-cols-4">
            {favorites.map(item => (
              <AnimalCard
                key={item.id}
                id={item.id}
                name={item.animalName}
                gender={item.gender}
                age={item.age}
                photoSrc={item.animalImages[0].url}
                status={item.status}
                animal={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
