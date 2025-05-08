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
  );
};

export default ProfilePage;
