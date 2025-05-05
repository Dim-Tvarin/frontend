import AnimalCard from './AnimalCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel';
import { useGetAnimalsQuery } from 'src/redux/animals/animalsApi';
import { CarouselSceleton } from 'components/sceletons/CarouselSceleton';

const AnimalsCarousel = () => {
  const { data, isLoading } = useGetAnimalsQuery({ page: 1, limit: 8 });

  if (isLoading) {
    return <CarouselSceleton />;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        duration: 1000,
      }}
      className="w-full z-10"
    >
      <CarouselContent className="-ml-16 flex ">
        {data &&
          data?.animals.map(item => (
            <CarouselItem
              key={item.id}
              className="basis-[66.6%] md:basis-[50%] lg:basis-[37%] xl:basis-[29%] 2xl:basis-[25%] pl-16"
            >
              <AnimalCard
                key={item.id}
                id={item.id}
                name={item.animalName}
                gender={item.gender}
                age={item.age}
                photoSrc={item?.animalImages[0]?.url}
                favorite={item.favorite}
                status={item.status}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default AnimalsCarousel;
