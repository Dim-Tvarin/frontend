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
        duration: 30,
      }}
      className="z-10 w-full"
    >
      <CarouselContent className="flex -ml-16">
        {data &&
          data?.animals.map(item => (
            <CarouselItem
              key={item.id}
              className="ml-16 pl-16 basis-[66.6%] md:basis-[50%] lg:basis-[37%] xl:basis-[29%] 2xl:basis-[25%]"
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
