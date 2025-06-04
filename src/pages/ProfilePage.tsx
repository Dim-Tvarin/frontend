import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/components/ui/tabs';
import { showToast } from 'components/Toast';
import { useEffect, useState } from 'react';
import {
  useGetMyAnimalsQuery,
  type AnimalsResponse,
} from 'src/redux/animals/animalsApi';
import { useSearchParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import AdvertsFilter from 'components/AdvertsFilter';
import ProfileMainTab from 'components/ProfileMainTab';
import ProfileMyAdvertsTab from 'components/ProfileMyAdvertsTab';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const [page, setPage] = useState(rawPage === 0 ? 1 : rawPage);
  const [filters, setFilters] = useState<AnimalsFilters>({});
  const [openFilters, setOpenFilters] = useState(false);

  const currentTab = location.pathname.includes('/profile/ads')
    ? 'my-adverts'
    : 'main-info';
  const handleTabChange = (value: string) => {
    if (value === 'my-adverts') {
      navigate('/profile/ads');
    } else {
      navigate('/profile/info');
    }
  };

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
    <div className="container">
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="pt-100 pb-100 grow flex-row gap-[18px]"
        data-orientation="vertical"
      >
        <TabsList className="flex flex-col gap-32 h-full p-0">
          {openFilters ? (
            <AdvertsFilter
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleFilterReset}
              onSubmit={handleFilterSubmit}
            />
          ) : (
            <>
              <TabsTrigger
                value="main-info"
                aria-orientation="vertical"
                className="w-[307px] max-h-[54px] text-base m-0 outline-none shadow-none rounded-[20px] py-[15px]
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
                className="w-[307px] max-h-[54px] text-base m-0 outline-none shadow-none rounded-[20px] py-[15px]
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
            </>
          )}
        </TabsList>
        <TabsContent value="main-info" data-orientation="vertical">
          <ProfileMainTab />
        </TabsContent>
        <TabsContent
          value="my-adverts"
          data-orientation="vertical"
          className="flex flex-col gap-[44px]"
        >
          <ProfileMyAdvertsTab
            setOpenFilters={setOpenFilters}
            data={data}
            isLoading={isLoading}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
