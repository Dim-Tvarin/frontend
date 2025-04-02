import { type Ref,  useState } from 'react';
import { Input } from './components/ui/input';
import { LuDelete } from 'react-icons/lu';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';
import { useDropzone } from 'react-dropzone';
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

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [...imageData, ...acceptedFiles].slice(0, 4); 
    setImageData(newFiles);
    onChange(newFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
       onDrop(Array.from(event.target.files));
     }
  };

  const handleDeleteImage = (index: number) => {
    const filteredFiles = imageData.filter((_, i) => i !== index);
    setImageData(filteredFiles);
    onChange(filteredFiles);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    multiple: true,
    maxFiles: 4,
  });

  return (
    <div className="w-full">
       {groupLabel && (
        <CustomLabel labelSize={labelSize} labelClass={labelClass}>
          {groupLabel}
        </CustomLabel>
      )}
       <div
        {...getRootProps()}
        className={`border-2 border-dashed border--border-drag p-6 rounded-lg text-center cursor-pointer bg-main-pink-l
        ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
      >
        <Input
          type="file"
          ref={ref}
          name={name}
          onChange={handleFileChange}
          disabled={imageData.length > 3 ? true : false}
          accept="image/*"
          multiple
          {...getInputProps()}
          {...rest}
        /> 
        <div className='flex items-center flex-col'>
        <p className='text-default-btn text-lg mb-16'>
          {isDragActive ? "Отпустите файл сюда..." : "Перетягніть файл сюди або "}
        </p>
        <div className='w-[382px] h-[64px] border-2 border-border-file bg-main-pink-l flex items-center gap-[19px]
          py-10 px-16 rounded-[8px]'>
            <div className='bg-input-file/50 text-white px-24 py-10 rounded-[10px]'>Вибрати файл</div>
            <p className='text-border-file'>Файл не вибрано</p>
        </div>
        </div>

      </div>
    
      <div className="grid grid-cols-2 gap-16 mt-32">
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
      {error && <FormError error={error} />}
    </div>
  );
};
