import AnimalCard from 'components/AnimalCard';
import Pagination from 'components/Pagination';
import ResponsiveImage from 'components/ResponsiveImage';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import {
  selectFavoriteAnimals,
  selectFavoritesLoading,
} from 'src/redux/animals/favoriteAnimalsSlice';
import emptyFavoriteMax from '../assets/empty-favorites@2x.png';
import emptyFavoriteMin from '../assets/empty-favorites@1x.png';
import { CustomButton } from 'components/CustomButton';
import { cn } from 'components/lib/utils';

type SortOrderFavorites = 'newest' | 'oldest' | 'none';

const FavoritePage = () => {
  const navigate = useNavigate();
  const isLoading = useSelector(selectFavoritesLoading);
  const favorites = useSelector(selectFavoriteAnimals);
  const perPage = 12;

  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(rawPage);

  const [sorting, setSorting] = useState<SortOrderFavorites>('none');
  const [openSorting, setOpenSorting] = useState(false);

  const sortedFavorites = useMemo(() => {
    if (sorting === 'none') return favorites;
    return [...favorites].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (sorting === 'newest') return dateB - dateA;
      if (sorting === 'oldest') return dateA - dateB;
      return 0;
    });
  }, [favorites, sorting]);

  const totalPages = Math.ceil(sortedFavorites.length / perPage);
  const paginatedFavorites = useMemo(
    () => sortedFavorites.slice((page - 1) * perPage, page * perPage),
    [sortedFavorites, page]
  );

  const onPageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  useEffect(() => {
    if (rawPage > 0 && rawPage !== page) {
      setPage(rawPage);
    }
  }, [rawPage, page]);

  const handleAscSorting = () => {
    setSorting('newest');
    setOpenSorting(false);
    setPage(1);
  };
  const handleDescSorting = () => {
    setSorting('oldest');
    setOpenSorting(false);
    setPage(1);
  };
  const handleClearFilter = () => {
    setSorting('none');
    setOpenSorting(false);
    setPage(1);
  };

  return (
    <div className="container flex flex-col h-full grow">
      <div className="relative mt-[32px] lg:mt-100 mb-[98px] lg:mb-50">
        <div className="flex">
          <h1 className="text-[32px] lg:text-lg text-center text-default-btn w-full">
            Обрані
          </h1>
          {favorites.length > 1 && (
            <div className="absolute z-10 flex flex-col top-[50px] lg:top-0 right-0">
              <CustomButton
                type="button"
                styleType="whiteButton"
                className="m-0 w-[192px] md:w-[227px] text-default-btn text-base"
                onClick={() => setOpenSorting(prev => !prev)}
              >
                {sorting === 'none' && 'Сортування за датою'}
                {sorting === 'newest' && 'Останні оголошення'}
                {sorting === 'oldest' && 'Давні оголошення'}
              </CustomButton>
              {openSorting && (
                <div className="w-[192px] md:w-[227px] flex flex-col gap-4 bg-dialog px-16 py-10 border-1 border-default-btn rounded-xl">
                  <button
                    onClick={handleAscSorting}
                    className={cn(
                      'text-default-btn text-left text-base lg:text-lg focus:outline-none hover:text-orange transition-all duration-300',
                      sorting === 'newest' && 'text-orange'
                    )}
                  >
                    Останні оголошення
                  </button>
                  <button
                    onClick={handleDescSorting}
                    className={cn(
                      'text-default-btn text-left text-base lg:text-lg focus:outline-none hover:text-orange transition-all duration-300',
                      sorting === 'oldest' && 'text-orange'
                    )}
                  >
                    Давні оголошення
                  </button>
                  <button
                    onClick={handleClearFilter}
                    className={cn(
                      'text-default-btn text-left text-base lg:text-lg focus:outline-none hover:text-orange transition-all duration-300',
                      sorting === 'none' && 'text-orange'
                    )}
                  >
                    Очистити фільтр
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {favorites.length === 0 && (
          <div className="flex flex-col align-center justify-center text-lg text-default-btn">
            <div className="w-[332px] h-[375px] mt-40 self-center">
              <ResponsiveImage
                urlMax1x={emptyFavoriteMax}
                urlMin1x={emptyFavoriteMin}
                alt="собака визирає з коробки"
              />
            </div>
            <p className="mt-40">Ой! Тут поки пусто</p>
            <p className="mt-25">Зазирніть у каталог, щоб обрати улюбленця!</p>
            <CustomButton
              styleType="defaultButton"
              className="mt-80 text-base w-[197px]"
              onClick={() => navigate('/allpets')}
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
          <div className="flex gap-[32px] lg:gap-[50px] flex-col grow">
            <div className="grid gap-[16px] lg:gap-[20px] wrap transition-all duration-500 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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

            {favorites && !!totalPages && totalPages > 1 && (
              <Pagination
                onPageChange={onPageChange}
                currentPage={page}
                totalPages={totalPages}
                className="mb-50 lg:mb-100 mt-auto"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritePage;
