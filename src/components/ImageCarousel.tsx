import { useState } from 'react';
import { Skeleton } from 'components/components/ui/skeleton';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { animalImage } from 'src/redux/animals/animalsApi';

const ImageCarousel = ({
  images,
  isDelete = false,
  onDelete,
}: {
  images: animalImage[];
  isDelete?: boolean;
  onDelete?: (id: string) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <Skeleton className="w-[325px] h-[210px] lg:w-[630px] lg:h-[471px] rounded-[30px] shadow-lg" />
    );
  }

  const handleDeleteImage = (id: string) => {
    onDelete?.(id);
  };

  return (
    <div className="flex flex-col items-center gap-32 w-full">
      <div className="relative min-w-[325px] h-[210px] w-[80%] md:h-[471px] lg:w-[466px] xl:w-[630px] rounded-[30px] bg-orange">
        {isDelete && (
          <div
            className="absolute top-24 right-20 md:top-[52px] md:right-[42px] w-[36px] h-[36px] bg-default-btn rounded-full grid place-items-center hover:bg-orange transition-all duration-300 z-10 cursor-pointer"
            onClick={() => handleDeleteImage(images[activeIndex].publicId)}
          >
            <FaRegTrashAlt color="white" />
          </div>
        )}
        <div className="absolute bottom-0 min-w-[310px] h-[194px] w-[95%] md:h-[440px] lg:w-[442px]  xl:w-[600px] rounded-[30px] overflow-hidden">
          <img
            src={images[activeIndex]?.url}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-20">
          {images.map((src, idx) =>
            idx === activeIndex ? null : (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-100 h-100 md:w-[200px] md:h-[200px] rounded-[20px] overflow-hidden transition ring-2 relative ${
                  idx === activeIndex ? 'ring-orange-400' : 'ring-transparent'
                }`}
              >
                {isDelete && (
                  <div
                    className="absolute top-10 right-10 w-[36px] h-[36px] bg-default-btn rounded-full grid place-items-center hover:bg-orange transition-all duration-300 cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteImage(src.publicId);
                    }}
                  >
                    <FaRegTrashAlt color="white" />
                  </div>
                )}
                <img
                  src={src.url}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
