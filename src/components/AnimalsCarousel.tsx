import AnimalCard from "./AnimalCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";
import { useGetAnimalsQuery } from "src/redux/animals/animalsApi";





const AnimalsCarousel = () => {
  const { data, isLoading } = useGetAnimalsQuery({page: 1, limit: 8})

  return (
    <Carousel
      opts={{
        align: "start", loop: true,
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
              photoSrc={item.animalImages[0]}
              favorite={item.favorite}
            />
            </CarouselItem>
          ))}
      
         
          
      
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default AnimalsCarousel;
