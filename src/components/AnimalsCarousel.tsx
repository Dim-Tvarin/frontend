import AnimalCard from './AnimalCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel';
import { useGetAnimalsQuery, type Animal } from 'src/redux/animals/animalsApi';
import { CarouselSceleton } from 'components/sceletons/CarouselSceleton';

interface AnimalsCarouselProps {
  animals?: Animal[];
  isLoading?: boolean;
  onRefetch?: () => void;
}

const AnimalsCarousel: React.FC<AnimalsCarouselProps> = ({
  animals,
  isLoading,
  onRefetch,
}) => {
  const { data: paged, isLoading: loadingFromHook } = useGetAnimalsQuery({
    page: 1,
    limit: 8,
  });

  const list = animals ?? paged?.animals ?? [];
  const loading = isLoading ?? loadingFromHook;
  const refetch = onRefetch;

  if (loading) {
    return <CarouselSceleton />;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        duration: 30,
      }}
      className="z-10 w-full"
    >
      <CarouselContent className="flex ml-0">
        {list &&
          list?.map(item => (
            <CarouselItem
              key={item.id}
              className="pl-0 pr-[16px] md:pr-[20px] "
            >
              <AnimalCard
                key={item.id}
                id={item.id}
                name={item.animalName}
                gender={item.gender}
                age={item.age}
                photoSrc={item.animalImages[0].url}
                status={item.status}
                animal={item}
                onRefetchMyAnimals={refetch}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex focus:outline-none" />
      <CarouselNext className="hidden md:flex focus:outline-none" />
    </Carousel>
  );
};

export default AnimalsCarousel;
