import { useEffect, useRef, useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import ResponsiveImage from './ResponsiveImage';
import avatarStubMin from '../assets/avatar-stub.png';
import avatarStubMax from '../assets/avatar-stub@2x.png';
import FormError from './FormError';

interface Props {
  currentAvatar?: string;
  onFileSelect: (file: File) => void;
  error?: string;
}

const AvatarUploadField: React.FC<Props> = ({
  currentAvatar,
  onFileSelect,
  error,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onFileSelect(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const avatarUrlMin = previewUrl || currentAvatar || avatarStubMin;
  const avatarUrlMax = previewUrl || currentAvatar || avatarStubMax;

  return (
    <div className="w-[305px] h-[305px] mr-30 shrink-0 relative">
      <ResponsiveImage
        urlMin={avatarUrlMin}
        urlMax={avatarUrlMax}
        alt="Аватар"
      />
      <LuCirclePlus
        onClick={handleIconClick}
        size={36}
        fill="white"
        className="absolute bottom-0 right-0  cursor-pointer"
      />
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <FormError error={error} />}
      <ul className="flex flex-col text-xs text-default-btn mt-20">
        <li>Формати: JPG, PNG, GIF</li>
        <li>Макс. розмір: 2 МБ</li>
        <li>Рекомендований розмір: 150×150 – 500×500 px</li>
      </ul>
    </div>
  );
};

export default AvatarUploadField;
