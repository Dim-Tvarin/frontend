import { useState } from "react";
import { Skeleton } from "components/components/ui/skeleton";

const ImageCarousel = ({images}: {images: string[];}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <Skeleton className="w-[630px] h-[529px] rounded-[30px] shadow-lg" />
    );
  }

  return (
    <div className="flex flex-col items-center gap-32">
      <div className="relative w-[630px] h-[529px] rounded-[30px] bg-orange">
        <div className="absolute bottom-0 w-[600px] h-[497px] rounded-[30px] overflow-hidden">
          <img
            src={images[activeIndex]}
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
                className={`w-[200px] h-[200px] rounded-[20px] overflow-hidden transition ring-2 ${
                  idx === activeIndex ? 'ring-orange-400' : 'ring-transparent'
                }`}
              >
                <img
                  src={src}
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
}

export default ImageCarousel;
