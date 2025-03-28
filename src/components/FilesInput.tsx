import { type Ref, useState } from 'react';
import { Input } from './components/ui/input';
import { LuDelete } from 'react-icons/lu';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';
import { cn } from './lib/utils';
export const FilesInput = ({
  ref,
  groupLabel,
  labelClass,
  labelSize = 'xl',
  name,
  error,
  onChange,
  ...rest
}: {
  ref?: Ref<HTMLInputElement>;
  groupLabel?: string;
  labelClass?: string;
  labelSize?: string;
  name: string;
  onChange: (images: File[]) => void;
  error?: string;
}) => {
  const [imageData, setImageData] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = Array.from(event.target.files);
      setImageData([...imageData, ...file]);
      onChange([...imageData, ...file]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const filteredFiles = imageData.filter((_, i) => i !== index);
    setImageData(filteredFiles);
    onChange(filteredFiles);
  };

  return (
    <div className="w-full">
      {groupLabel && (
        <CustomLabel labelSize={labelSize} labelClass={labelClass}>
          {groupLabel}
        </CustomLabel>
      )}
      <Input
        type="file"
        ref={ref}
        name={name}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        {...rest}
        className={cn(
          'border-1 border-border-file bg-main-pink-l h-[64px] flex items-center justify-center py-10 px-16 file:bg-input-file/50 file:text-white file:px-24 file:py-10 file:rounded-[10px] file:h-[44px] file:mx-10 mb-32',
          { 'border-error-input text-error-input': error }
        )}
      />
      {error && <FormError error={error} />}
      <div className="grid grid-cols-2 gap-16">
        {imageData.map((img, index) => (
          <div key={index} className="flex gap-8 w-[305px]">
            <img
              src={URL.createObjectURL(img)}
              alt={`Uploaded ${index}`}
              className="w-[54px] h-[54px] rounded-[8px]"
            />
            <div className="text-left text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px]">
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
