import AnimalCard from 'components/AnimalCard';
import Pagination from 'components/Pagination';
import ResponsiveImage from 'components/ResponsiveImage';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import {
  selectFavoriteAnimals,
  selectFavoritesLoading,
} from 'src/redux/animals/favoriteAnimalsSlice';
import emptyFavoriteMax from '../assets/empty-favorites@2x.png';
import emptyFavoriteMin from '../assets/empty-favorites@1x.png';
import { CustomButton } from 'components/CustomButton';

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
    <div className="container flex flex-col h-full grow">
      <div className="relative text-center mt-100 mb-50">
        <h1 className="text-[32px] text-default-btn w-full">Обрані</h1>
        {favorites.length === 0 && (
          <div className="flex flex-col align-center justify-center text-lg text-default-btn">
            <div className="w-[332px] h-[375px] mt-40 self-center">
              <ResponsiveImage
                urlMax={emptyFavoriteMax}
                urlMin={emptyFavoriteMin}
                alt="собака визирає з коробки"
              />
            </div>
            <p className="mt-40">Ой! Тут поки пусто</p>
            <p className="mt-25">Зазирніть у каталог, щоб обрати улюбленця!</p>
            <CustomButton
              styleType="defaultButton"
              className="mt-80 text-base w-[197px]"
            >
              До списку тварин
            </CustomButton>
          </div>
        )}
      </div>

      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <>
          <div className="flex gap-20 flex-col h-full grow">
            <div className="grid gap-20 wrap transition-all duration-500 grid-cols-4 ">
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
            </div>
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
