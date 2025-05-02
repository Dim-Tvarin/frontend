import { useEffect, useState } from 'react';
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
  const [localImages, setLocalImages] = useState(images);

  if (images.length === 0) {
    return (
      <Skeleton className="w-[630px] h-[529px] rounded-[30px] shadow-lg" />
    );
  }

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const handleDeleteImage = (id: string) => {
    //modal
    const updatedImages = localImages.filter(img => img.publicId !== id);
    setLocalImages(updatedImages);
    setActiveIndex(prevIndex => {
      const newIndex = Math.max(
        0,
        prevIndex - (prevIndex >= updatedImages.length ? 1 : 0)
      );
      return newIndex;
    });
    onDelete?.(id);
  };

  return (
    <div className="flex flex-col items-center gap-32">
      <div className="relative w-[630px] h-[529px] rounded-[30px] bg-orange">
        {isDelete && (
          <div
            className="absolute top-[52px] right-[42px] w-[36px] h-[36px] bg-default-btn rounded-full grid place-items-center hover:bg-orange transition-all duration-300 z-10"
            onClick={() => handleDeleteImage(localImages[activeIndex].publicId)}
          >
            <FaRegTrashAlt color="white" />
          </div>
        )}
        <div className="absolute bottom-0 w-[600px] h-[497px] rounded-[30px] overflow-hidden">
          <img
            src={localImages[activeIndex].url}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {localImages.length > 1 && (
        <div className="flex gap-20">
          {localImages.map((src, idx) =>
            idx === activeIndex ? null : (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-[200px] h-[200px] rounded-[20px] overflow-hidden transition ring-2 relative ${
                  idx === activeIndex ? 'ring-orange-400' : 'ring-transparent'
                }`}
              >
                {isDelete && (
                  <div
                    className="absolute top-10 right-10 w-[36px] h-[36px] bg-default-btn rounded-full grid place-items-center hover:bg-orange transition-all duration-300"
                    onClick={() => handleDeleteImage(src.publicId)}
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
