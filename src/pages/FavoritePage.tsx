import AnimalCard from 'components/AnimalCard';
import Pagination from 'components/Pagination';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import {
  selectFavoriteAnimals,
  selectFavoritesLoading,
} from 'src/redux/animals/favoriteAnimalsSlice';

const FavoritePage = () => {
  const isLoading = useSelector(selectFavoritesLoading);
  const favorites = useSelector(selectFavoriteAnimals);
  const perPage = 16;

  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(rawPage);

  const totalPages = Math.ceil(favorites.length / perPage);
  const paginatedFavorites = favorites.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    if (rawPage > 0 && rawPage !== page) {
      setPage(rawPage);
    }
  }, [rawPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: String(newPage) });
  };

  return (
    <div className="container flex flex-col">
      <div className="relative text-center mt-100 mb-50">
        <h1 className="text-[32px] text-default-btn w-full">Обрані</h1>
        {favorites.length === 0 && (
          <p className="text-lg text-default-btn">Поки немає обраних</p>
        )}
      </div>

      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <>
          <div className="flex gap-20 flex-col">
            <div className="grid gap-20 wrap transition-all duration-500 grid-cols-4 grow">
              {paginatedFavorites.map(item => (
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
            </div>{' '}
            {totalPages > 1 && (
              <div className="mt-auto">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mb-100"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritePage;
