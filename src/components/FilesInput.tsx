import { type Ref,  useEffect,  useState } from 'react';
import { Input } from './components/ui/input';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';
import { useDropzone } from 'react-dropzone';
import { cn } from './lib/utils';
import PhotoPrev from './PhotoPrev';
//import { showToast } from 'components/Toast';

export const FilesInput = ({
  ref,
  groupLabel,
  labelClass,
  labelSize = 'xl',
  name,
  error,
  onChange,
  value,
  ...rest
}: {
  ref?: Ref<HTMLInputElement>;
  groupLabel?: string;
  labelClass?: string;
  labelSize?: string;
  name: string;
  onChange: (images: File[]) => void;
  value: File[],
  error?: string;
}) => {

  const [imageData, setImageData] = useState<File[]>(value || []);

  useEffect(()=> {
    if (value.length !== imageData.length) {
      setImageData(value);
    }
  }, [value])

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
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((e) => {
          // showToast({
          //   title: 'Помилка завантаження файлу',
          //   description: 'Недопустимий формат або розмір файлу',
          //   status: 'error',
          // });
        })
      })
    },
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
            <div className={cn('bg-default-btn text-white px-20 py-10 rounded-[10px] w-[149px] text-sm', 
              { 'bg-input-file/50 cursor-default' : imageData.length > 3})}>Вибрати файл</div>
            <p className='text-border-file'>Файл не вибрано</p>
        </div>
        <p className='text-input-border text-sm mt-8'>Загрузити можна максимум 4 фото</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-16 mt-32">
        {imageData.map((img, index) => (
          <PhotoPrev image={img} index={index} ondelete={handleDeleteImage} key={index}/>
        ))}
      </div>
      {error && <FormError error={error} />}
    </div>
  );
};
