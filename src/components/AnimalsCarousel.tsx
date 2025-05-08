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
      }}
      className="w-full z-10"
    >
      <CarouselContent>
        {data?.animals.map(item => (
          <CarouselItem key={item.id} className="basis-1/4">
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default AnimalsCarousel;
