import { useEffect, useState } from "react";
import { Progress } from "./components/ui/progress";
import { LuDelete } from 'react-icons/lu';


const PhotoPrev = ({image, index, ondelete} : {image: File; index: number; ondelete: (index: number)=> void}) => {
   const [progress, setProgress] = useState(10);

useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex gap-8 w-[305px]">
          <img
            src={URL.createObjectURL(image)}
            alt={`Uploaded ${index}`}
            className="w-[54px] h-[54px] rounded-[8px]"
          />
          <div className="text-left text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px] w-full">
            <p>{image.name.split('.')[0]}</p>
            <p className="text-gray">
              {(image.size / (1024 * 1024)).toFixed(2)} МБ
            </p>
            <div className="space-y-5 transition-all duration-300">
              <Progress value={progress} className="w-[100%]"/>
            </div>
            {/* <Progress value={60} className='bg-orange h-[3px] mt-20 w-full'/> bg-[#D9D9D9] h-[3px] */}
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
