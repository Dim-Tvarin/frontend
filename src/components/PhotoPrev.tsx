import { useMemo } from "react";
import { LuDelete } from 'react-icons/lu';
import PhotoProgress from "./PhotoProgress";


const PhotoPrev = ({image, index, ondelete} : {image: File; index: number; ondelete: (index: number)=> void}) => {
  const imgSrc = useMemo(() => URL.createObjectURL(image), [image])

  return (
    <div className="flex gap-8 w-[305px]">
          <img
            src={imgSrc}
            alt={`Uploaded ${index}`}
            className="w-[54px] h-[54px] rounded-[8px]"
          />
          <div className="text-left text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px] w-full">
            <p>{image.name.split('.')[0]}</p>
            <p className="text-gray">
              {(image.size / (1024 * 1024)).toFixed(2)} МБ
            </p>
            <PhotoProgress />
          </div>
          <button
            onClick={() => ondelete(index)}
            className="ml-auto"
          >
            <LuDelete size={24} color="#83818B" />
          </button>
        </div>
  );
}

export default PhotoPrev;
