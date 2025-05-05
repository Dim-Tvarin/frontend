import { CustomButton } from 'components/CustomButton';
import ResponsiveImage from 'components/ResponsiveImage';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/components/ui/tabs';
import avatarStubMin from '../assets/avatar-stub.png';
import avatarStubMax from '../assets/avatar-stub@2x.png';
import { selectUser } from 'src/redux/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from 'src/redux/store';
import { logoutThunk } from 'src/redux/users/usersOperations';
import { showToast } from 'components/Toast';
import { LuCirclePlus } from 'react-icons/lu';
import { FiFilter } from 'react-icons/fi';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import AnimalCard from 'components/AnimalCard';
import { useEffect, useState } from 'react';
import {
  useGetMyAnimalsQuery,
  type AnimalsResponse,
} from 'src/redux/animals/animalsApi';
import { useNavigate, useSearchParams } from 'react-router';
import Pagination from 'components/Pagination';
import { openDialog } from 'src/redux/dialogs/dialogSlice';
import AdvertsFilter from 'components/AdvertsFilter';

export interface AnimalsFilters {
  animalType?: 'cats' | 'dogs' | 'birds' | 'other';
  gender?: 'male' | 'female';
  breed?: string;
  location?: string;
  age?: string;
  size?: string;
  status?: 'active' | 'inactive';
  sortByDate?: 'newest' | 'oldest';
}

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logoutThunk());
    showToast({
      title: 'Ви успішно вийшли',
      status: 'success',
    });
  };
  const [searchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const [page, setPage] = useState(rawPage === 0 ? 1 : rawPage);
  const [filters, setFilters] = useState<AnimalsFilters>({});
  const [openFilters, setOpenFilters] = useState(false);
  const { data, isLoading, error, refetch } = useGetMyAnimalsQuery({
    page,
    limit: 9,
    ...filters,
  }) as {
    data: AnimalsResponse;
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };
  const totalPages = data ? Math.ceil(data.total / 9) : 1;

  useEffect(() => {
    if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при завантаженні даних',
        status: 'error',
      });
    }
  }, [error]);

  const handleFilterChange = <K extends keyof AnimalsFilters>(
    key: K,
    value: AnimalsFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFilterReset = () => {
    setFilters({});
  };

  const handleFilterSubmit = () => {
    setPage(1);
    refetch();
  };

  return (
    <Tabs
      defaultValue="main-info"
      className="pt-100 px-80 grow flex-row gap-40"
      data-orientation="vertical"
    >
      <TabsList className="flex flex-col gap-25 h-full">
        <TabsTrigger
          value="main-info"
          aria-orientation="vertical"
          className="w-[285px] h-[77px] text-lg m-0 outline-none shadow-none rounded-[20px] py-[26px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-white hover:text-default-btn bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 disabled:bg-disabled  
          data-[state=active]:text-default-btn 
          data-[state=active]:bg-white 
          data-[state=active]:border-2
          data-[state=active]:border-default-btn 
          data-[state=active]:hover:border-orange"
        >
          Основна інформація
        </TabsTrigger>

        <TabsTrigger
          value="my-adverts"
          aria-orientation="vertical"
          className="w-[285px] h-[77px] text-lg m-0 outline-none shadow-none rounded-[20px] py-[26px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-white hover:text-default-btn bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 disabled:bg-disabled  
          data-[state=active]:text-default-btn 
          data-[state=active]:bg-white 
          data-[state=active]:border-2
          data-[state=active]:border-default-btn 
          data-[state=active]:hover:border-orange"
        >
          Мої оголошення
        </TabsTrigger>
        {openFilters && (
          <AdvertsFilter
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleFilterReset}
            onSubmit={handleFilterSubmit}
          />
        )}
      </TabsList>
      <TabsContent value="main-info" data-orientation="vertical">
        <div className="flex">
          <div className="w-[305px] h-[305px] mr-30 shrink-0">
            <ResponsiveImage
              urlMax={user.avatarURL || avatarStubMax}
              urlMin={user.avatarURL || avatarStubMin}
              alt="аватар"
            />
          </div>
          <div
            className="flex flex-col w-full
          "
          >
            <div className="flex flex-col gap-10 text-left text-default-btn text-lg">
              <p className="text-[28px] font-bold">{user.name}</p>
              <p>
                {user.userType === 'guardian' ? 'Опікун' : 'Майбутній господар'}
              </p>
              <p>{user.location}</p>
              <p>{user.phone}</p>
            </div>
            <div className="flex gap-20 ml-auto mt-auto">
              <CustomButton
                onClick={() => dispatch(openDialog('editUser'))}
                styleType="defaultButton"
                className="m-0 w-[210px] h-[45px]"
              >
                Редагувати профіль
              </CustomButton>
              <CustomButton
                styleType="whiteButton"
                className="w-[130px] h-[45px]"
                onClick={handleClick}
              >
                Вийти
              </CustomButton>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="my-adverts"
        data-orientation="vertical"
        className="flex flex-col gap-[44px]"
      >
        <div className="flex flex-row align-center justify-between">
          <CustomButton
            type="submit"
            styleType="defaultButton"
            className="flex gap-8 w-[238px] text-base m-0"
            onClick={() => {
              navigate('/announcement');
            }}
          >
            <LuCirclePlus size={24} />
            Додати оголошення
          </CustomButton>
          <CustomButton
            type="button"
            styleType="defaultButton"
            className="flex gap-[6px] w-[108px] h-[45px] m-0 text-base"
            onClick={() => setOpenFilters(prev => !prev)}
          >
            <FiFilter className="w-25 h-[29px]" />
            Фільтр
          </CustomButton>
        </div>
        {data?.animals.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-10">
            У вас поки немає оголошень.
          </p>
        ) : (
          <>
            {isLoading && !data?.animals && (
              <PetsListSkeleton className="grid-cols-3" length={9} />
            )}
            <div className="grid grid-cols-3 gap-20 wrap">
              {data?.animals.map(item => (
                <AnimalCard
                  key={item.id}
                  id={item.id}
                  name={item.animalName}
                  gender={item.gender}
                  age={item.age}
                  photoSrc={item?.animalImages[0]?.url}
                  isMyProfile={true}
                  status={item.status}
                />
              ))}
            </div>
          </>
        )}
        {!isLoading && data && !!totalPages && totalPages > 1 && (
          <Pagination
            onPageChange={setPage}
            currentPage={page}
            totalPages={totalPages}
            className="mb-50 mt-auto"
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;
