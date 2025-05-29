import { useState } from 'react';
import { Skeleton } from 'components/components/ui/skeleton';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { animalImage } from 'src/redux/animals/animalsApi';
import { useLocation } from 'react-router';
import { cn } from './lib/utils';

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
  const location = useLocation();
  const isEditAnnouncement = location.pathname.includes('editannouncement');

  if (images.length === 0) {
    return (
      <Skeleton className="shadow-lg rounded-[30px] w-[325px] lg:w-[630px] h-[210px] lg:h-[471px]" />
    );
  }

  const handleDeleteImage = (id: string) => {
    onDelete?.(id);
  };

  return (
    <div className="flex flex-col items-center gap-32 w-full">
      <div className="relative bg-orange rounded-[30px] w-[95%] lg:w-[466px] xl:w-[630px] min-w-[325px] h-[210px] md:h-[471px] xl:h-[460px]">
        {isDelete && (
          <div
            className="top-24 md:top-[52px] right-20 md:right-[42px] z-10 absolute place-items-center grid bg-default-btn hover:bg-orange rounded-full w-[36px] h-[36px] transition-all duration-300 cursor-pointer"
            onClick={() => handleDeleteImage(images[activeIndex].publicId)}
          >
            <FaRegTrashAlt color="white" />
          </div>
        )}
        <div
          className={cn(
            'bottom-0 absolute rounded-[30px] w-[95%] lg:w-[442px] xl:w-[615px] min-w-[310px] h-[194px] md:h-[428px] overflow-hidden xl:h-[444px]',
            isEditAnnouncement ? 'right-0' : 'left-0'
          )}
        >
          <img
            src={images[activeIndex]?.url}
            alt="Selected"
            className="w-full h-full object-cover object-top"
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
                className={`w-100 h-100 md:w-[198px] md:h-[157px] rounded-[20px] overflow-hidden transition ring-2 relative ${
                  idx === activeIndex ? 'ring-orange-400' : 'ring-transparent'
                }`}
              >
                {isDelete && (
                  <div
                    className="top-10 right-10 absolute place-items-center grid bg-default-btn hover:bg-orange rounded-full w-[36px] h-[36px] transition-all duration-300 cursor-pointer"
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
                  className="w-full h-full object-cover object-top"
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
