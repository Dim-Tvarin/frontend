import { useState, useEffect, type Ref } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';
import PhotoPrev from './PhotoPrev';
import { showToast } from './Toast';
import type { animalImage } from 'src/redux/animals/animalsApi';
import getCroppedImg from '../helpers/cropImage';
import Modal from './ImageCropModal';
import { cn } from './lib/utils';

export const FilesInput = ({
  ref,
  groupLabel,
  labelClass,
  labelSize = 'xl',
  name,
  error,
  onChange,
  value,
  defaultValue,
  imagesForDelete = 0,
  ...rest
}: {
  ref?: Ref<HTMLInputElement>;
  groupLabel?: string;
  labelClass?: string;
  labelSize?: string;
  name: string;
  onChange: (images: File[]) => void;
  value: File[];
  error?: string;
  defaultValue?: animalImage[];
  imagesForDelete?: number;
}) => {
  const [imageData, setImageData] = useState<File[]>(value || []);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (value.length !== imageData.length) {
      setImageData(value);
    }
  }, [value]);

  const openCropModal = (file: File) => {
    setSelectedImage(file);
    setCropModalOpen(true);
  };

  const onCropComplete = (_: unknown, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    if (selectedImage && croppedAreaPixels) {
      const cropped = await getCroppedImg(selectedImage, croppedAreaPixels);
      const newFiles = [...imageData, cropped].slice(0, 4);
      setImageData(newFiles);
      onChange(newFiles);
    }
    setCropModalOpen(false);
    setSelectedImage(null);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) openCropModal(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) onDrop(Array.from(event.target.files));
  };

  const handleDeleteImage = (index: number) => {
    const updated = imageData.filter((_, i) => i !== index);
    setImageData(updated);
    onChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    multiple: false,
    maxFiles: 1,
    onDropRejected: (fileRejections: FileRejection[]) => {
      fileRejections.forEach(({ errors }) => {
        errors.forEach(() => {
          showToast({
            title: 'Помилка завантаження файлу',
            description: 'Недопустимий формат або розмір файлу',
            status: 'error',
          });
        });
      });
    },
  });

  const isDisabled =
    imageData.length >= 4 ||
    (defaultValue &&
      defaultValue?.length + imageData.length - imagesForDelete >= 4);

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
        ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
      >
        <Input
          type="file"
          ref={ref}
          name={name}
          onChange={handleFileChange}
          disabled={isDisabled}
          accept="image/*"
          multiple={false}
          {...getInputProps()}
          {...rest}
        />
        <div className="flex items-center flex-col">
          <p className="text-default-btn text-lg mb-4">
            {isDragActive
              ? 'Отпустите файл сюда...'
              : 'Перетягніть файл сюди або натисніть'}
          </p>
          <div
            className="w-[382px] h-[64px] border-2 border-border-file bg-main-pink-l flex items-center gap-[19px]
          py-10 px-16 rounded-[8px]"
          >
            <Button
              type="button"
              className={cn(
                'bg-default-btn text-white px-20 py-10 rounded-[10px] w-[149px] text-sm',
                {
                  'bg-btn-disabled/50 cursor-default focus:outline-none':
                    isDisabled,
                }
              )}
            >
              Вибрати файл
            </Button>
            <p className="text-border-file">Файл не вибрано</p>
          </div>
          <p className="text-input-border text-sm mt-8">
            Загрузити можна максимум 4 фото
          </p>
        </div>
      </div>

      {imageData.length > 0 && (
        <div className="grid grid-cols-2 gap-16 mt-8">
          {imageData.map((img, index) => (
            <PhotoPrev
              image={img}
              index={index}
              ondelete={handleDeleteImage}
              key={index}
            />
          ))}
        </div>
      )}

      {error && <FormError error={error} />}

      {cropModalOpen && selectedImage && (
        <Modal
          onClose={() => setCropModalOpen(false)}
          title="Обрізати зображення"
        >
          <div className="w-full h-[400px] relative">
            <Cropper
              image={URL.createObjectURL(selectedImage)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={() => setCropModalOpen(false)}>Скасувати</Button>
            <Button onClick={handleCropConfirm}>Зберегти</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
