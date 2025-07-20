import { useLocation, useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/components/ui/tabs';
import ProfileMainTab from 'components/ProfileMainTab';
import ProfileMyAdvertsTab from 'components/ProfileMyAdvertsTab';
import { FiltersProvider } from 'src/context/FiltersContext';

export default function ProfileLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.endsWith('/ads') ? 'ads' : 'info';
  const handleTabChange = (tab: string) => {
    navigate(`/profile/${tab}`);
  };

  return (
    <FiltersProvider>
      <div className="container">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="pt-32 lg:pt-100 pb-50 lg:pb-100 grow flex-col 2xl:flex-row gap-[37px] lg:gap-[18px]"
          data-orientation="vertical"
        >
          <TabsList className="flex flex-col md:flex-row 2xl:flex-col gap-20 lg:gap-32 self-center md:self-auto h-full p-0">
            <TabsTrigger
              value="info"
              aria-orientation="vertical"
              className="w-[304px] lg:w-[307px] max-h-[54px] text-base m-0 outline-none shadow-none rounded-[20px] py-[15px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-default-btn bg-white dark:bg-transparent border-default-btn dark:border-orange hover:border-orange dark:hover:border-btn-orange-hov border-2 disabled:bg-disabled  
          data-[state=active]:text-white data-[state=active]:dark:text-black
          data-[state=active]:hover:text-default-btn 
          data-[state=active]:bg-default-btn data-[state=active]:dark:bg-orange
          data-[state=active]:hover:bg-orange data-[state=active]:dark:hover:bg-btn-orange-hov
          data-[state=active]:hover:border-default-btn data-[state=active]:dark:hover:border-btn-orange"
            >
              Основна інформація
            </TabsTrigger>
            <TabsTrigger
              value="ads"
              aria-orientation="vertical"
              className="w-[304px] lg:w-[307px] max-h-[54px] text-base m-0 outline-none shadow-none rounded-[20px] py-[15px]
          data-[state=active]:shadow-none 
          data-[state=active]:outline-none 
          text-default-btn bg-white dark:bg-transparent border-default-btn dark:border-orange hover:border-orange dark:hover:border-btn-orange-hov border-2 disabled:bg-disabled  
          data-[state=active]:text-white data-[state=active]:dark:text-black
          data-[state=active]:hover:text-default-btn 
          data-[state=active]:bg-default-btn data-[state=active]:dark:bg-orange
          data-[state=active]:hover:bg-orange data-[state=active]:dark:hover:bg-btn-orange-hov
          data-[state=active]:hover:border-default-btn data-[state=active]:dark:hover:border-btn-orange"
            >
              Мої оголошення
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="info"
            data-orientation="vertical"
            className="m-auto lg:m-0 w-full"
          >
            <ProfileMainTab />
          </TabsContent>

          <TabsContent
            value="ads"
            data-orientation="vertical"
            className="flex flex-col gap-32 lg:gap-[44px] w-full"
          >
            <ProfileMyAdvertsTab />
          </TabsContent>
        </Tabs>
      </div>
    </FiltersProvider>
  );
}
