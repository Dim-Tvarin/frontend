import { useEffect, useState } from 'react';
import { Progress } from "./components/ui/progress";

const PhotoProgress = () => {
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
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="space-y-5 transition-all duration-300">
              <Progress value={progress} className="w-[100%]"/>
            </div>
  );
}

export default PhotoProgress;
