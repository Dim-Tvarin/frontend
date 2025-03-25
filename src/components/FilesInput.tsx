import { type Ref, useState } from 'react';
import { Input } from './components/ui/input';
import { MdErrorOutline } from 'react-icons/md';
import { LuDelete } from 'react-icons/lu';
export const FilesInput = ({
  ref,
  name,
  error,
  files,
  ...rest
}: {
  ref?: Ref<HTMLInputElement>;
  name: string;
  files: File[];
  error?: string;
}) => {
  const [imageData, setImageData] = useState<File[]>([]);

  console.log('files', files);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log('event.target.files', event.target.files, event);
      const files = Array.from(event.target.files);
      setImageData([...imageData, ...files]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageData(imageData.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-32">
      <Input
        type="file"
        ref={ref}
        name={name}
        onChange={handleFileChange}
        multiple
        {...rest}
        className="border-1 border-border-file bg-main-pink-l h-[64px] flex items-center
          justify-center py-10 px-16 file:bg-input-file/50 file:text-white file:px-24 file:py-10 
          file:rounded-[10px] file-h-[44px] file:mx-10 mb-32"
      />
      {error && (
        <div className="flex items-center mt-[10px] gap-[4px]">
          <MdErrorOutline size={18} className="text-error" />
          <p className="text-left text-error text-xs">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-16">
        {imageData.map((img, index) => (
          <div key={index} className="flex gap-8 w-[305px]">
            <img
              src={URL.createObjectURL(img)}
              alt={`Uploaded ${index}`}
              className="w-[54px] h-[54px] rounded-8"
            />
            <div className="text-left">
              <p>{img.name.split('.')[0]}</p>
              <p className="text-gray">
                {(img.size / (1024 * 1024)).toFixed(2)} МБ
              </p>
            </div>
            <button
              onClick={() => handleDeleteImage(index)}
              className="ml-auto"
            >
              <LuDelete size={24} color="#83818B" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
